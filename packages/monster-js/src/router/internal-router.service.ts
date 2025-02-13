import { WebComponentInterface } from "../interfaces/web-component.interface";
import { createComponent } from "../template-engine/create-component";
import { getURLQueryParams } from "../utils/get-url-query-params";
import { haveSameProperties } from "../utils/have-same-properties";
import { removeStartAndEndSlashes } from "../utils/remove-start-and-end-slashes";
import { evaluateRoute } from "./evaluate-route";

export interface ViewRouteInterface {
    comment: Comment;
    element: Element; // null element value means not yet activated
    rawComponent: () => Promise<any>,
    canActivate: any[],
    canDeactivate: any[],
    routerData: any,
    routerPath: string,
    pathMatch: 'full' | 'prefix',
    redirectTo: string,
}

export interface RouteChangeSubscriberInterface {
    type: 'all' | 'param' | 'query';
    callback: (...args: any[]) => any;
    isConnected: () => boolean;
    component: any;
    params: Record<string, string>;
    queryParams: Record<string, string>;
}

export const COMPONENT_URL_PATH_SYMBOL = Symbol('COMPONENT_URL_PATH_SYMBOL');

export class InternalRouterService {

    private static _instance: InternalRouterService;

    private _navigating: boolean;

    private readonly _viewRoutes: ViewRouteInterface[] = [];

    private _subscribers: RouteChangeSubscriberInterface[] = [];

    private _savedCurrentUrl: string;
    private _savedCurrentPathname: string;

    constructor() {
        if (InternalRouterService._instance) return InternalRouterService._instance;

        const originalPushState = history.pushState;
        const originalReplaceState = history.replaceState;
        const saveUrl = () => {
            this._savedCurrentUrl = removeStartAndEndSlashes(window.location.pathname + window.location.search);
            this._savedCurrentPathname = window.location.pathname;
        };

        saveUrl();

        // Override pushState
        history.pushState = function () {
            const result = originalPushState.apply(history, arguments as any);
            saveUrl();
            return result;
        };

        // Override replaceState
        history.replaceState = function () {
            const result = originalReplaceState.apply(history, arguments as any);
            saveUrl();
            return result;
        };

        // Listen for back/forward navigation
        window.addEventListener("popstate", () => {
            const currentUrl = removeStartAndEndSlashes(window.location.pathname + window.location.search);
            this.navigate(currentUrl, false, true);
            saveUrl();
        });

        InternalRouterService._instance = this;
    }

    private _isSameRoute(url: string) {
        const cleanNewUrl = removeStartAndEndSlashes(url);
        const cleanOldUrl = this._savedCurrentUrl;
        return cleanNewUrl === cleanOldUrl;
    }

    private async _processSingleCanActivate(url: string, route: ViewRouteInterface) {
        let canActivate = true;

        const aboutToActivate = !route.element && evaluateRoute(route.routerPath, url, route.pathMatch);
        if (aboutToActivate) {
            for (let ii = 0; ii < (route.canActivate || []).length; ii++) {
                const guard = route.canActivate[ii];
                if (!(await guard(route.routerData))) {
                    canActivate = false;
                }
            }
        }

        return canActivate;
    }

    private async _processCanActivate(url: string) {
        let canActivate = true;

        for (let i = 0; i < this._viewRoutes.length; i++) {
            const route = this._viewRoutes[i];
            const _aboutToActivate = await this._processSingleCanActivate(url, route);
            if (!_aboutToActivate) {
                canActivate = false;
            }
        }

        return canActivate;
    }

    private async _processSingleCanDeactivate(url: string, route: ViewRouteInterface) {
        let canDeactivate = true;

        const aboutToDeactivate = route.element && !evaluateRoute(route.routerPath, url, route.pathMatch);
        if (aboutToDeactivate) {
            for (let ii = 0; ii < (route.canDeactivate || []).length; ii++) {
                const guard = route.canDeactivate[ii];
                if (!(await guard(route.routerData))) {
                    canDeactivate = false;
                }
            }
        }

        return canDeactivate;
    }

    private async _processCanDeactivate(url: string) {
        let canDeactivate = true;

        for (let i = 0; i < this._viewRoutes.length; i++) {
            const route = this._viewRoutes[i];
            const _canDeactivate = await this._processSingleCanDeactivate(url, route);
            if (!_canDeactivate) {
                canDeactivate = false;
            }
        }

        return canDeactivate;
    }

    private async _processSingleRedirects(url: string, route: ViewRouteInterface) {
        const canRedirect = route.redirectTo && evaluateRoute(route.routerPath, url, route.pathMatch);
        if (canRedirect) {
            return route.redirectTo;
        }
        return null;
    }

    private async _processRedirects(url: string) {
        let redirectTo: string = null;

        for (let i = 0; i < this._viewRoutes.length; i++) {
            if (!redirectTo) {
                const route = this._viewRoutes[i];
                const canRedirect =  await this._processSingleRedirects(url, route);
                if (canRedirect) {
                    redirectTo = route.redirectTo;
                }
            }
        }

        return redirectTo;
    }

    private async _processDeactivations(url: string) {
        const handlers: (() => void)[] = [];
        for (let i = 0; i < this._viewRoutes.length; i++) {
            const route = this._viewRoutes[i];
            const shouldDeactivate = route.element && !evaluateRoute(route.routerPath, url, route.pathMatch);
            if (shouldDeactivate) {
                handlers.push(() => {
                    route.element.remove();
                    this._viewRoutes[i].element = null;
                });
            }
        }
        return handlers;
    }

    private async _processSingleActivations(url: string, route: ViewRouteInterface) {
        let handler: () => void = null;
        const shouldActivate = !route.element && evaluateRoute(route.routerPath, url, route.pathMatch);
        if (shouldActivate) {
            const component = await route.rawComponent();
            handler = () => {
                const element = createComponent(component);
                (element as any)[COMPONENT_URL_PATH_SYMBOL] = route.routerPath;
                route.element = element;
                route.comment.after(element);
            };
        }
        return handler;
    }

    private async _processActivations(url: string) {
        const handlers: (() => void)[] = [];
        for (let i = 0; i < this._viewRoutes.length; i++) {
            const route = this._viewRoutes[i];
            const handler = await this._processSingleActivations(url, route);
            if (handler) {
                handlers.push(handler);
            }
        }
        return handlers;
    }

    public async addViewRoute(route: ViewRouteInterface) {
        this._viewRoutes.push(route);
        const canActivate = await this._processSingleCanActivate(this._savedCurrentPathname, route);
        if (!canActivate) return;

        // process redirects
        const redirectTo = await this._processSingleRedirects(this._savedCurrentPathname, route);
        if (redirectTo) {
            this.navigate(redirectTo);
            return;
        }

        // process activation
        const handler = await this._processSingleActivations(this._savedCurrentPathname, route);
        if (handler) handler();
    }

    public redirect(url: string, replaceState: boolean, preventHistoryUpdate: boolean) {
        if (replaceState && !preventHistoryUpdate) {
            window.history.replaceState({}, '', url);
        } else if (!preventHistoryUpdate) {
            window.history.pushState({}, '', url);
        }

        this._triggerRouterChangeSubscribers();
    }

    public addSubscriber(subscriber: RouteChangeSubscriberInterface) {
        this._subscribers.push(subscriber);
        const webComponent = (subscriber.component as WebComponentInterface);
        const callback = () => {
            this._triggerRouterChangeSubscriber(subscriber);
            webComponent.removeTriggerAfterConnected(callback);
        };
        webComponent.addTriggerAfterConnected(callback);
    }

    private _triggerRouterChangeSubscriber(subscriber: RouteChangeSubscriberInterface) {
        if (subscriber.isConnected()) {
            let routeParams: Record<string, string> = {};
            let queryParams: Record<string, string> = {};
            switch(subscriber.type) {
                case 'all':
                    queryParams = getURLQueryParams();
                    routeParams = evaluateRoute(subscriber.component[COMPONENT_URL_PATH_SYMBOL], this._savedCurrentPathname, 'prefix');
                    subscriber.callback(routeParams || {}, queryParams || {});
                    break;
                case 'param':
                    routeParams = evaluateRoute(subscriber.component[COMPONENT_URL_PATH_SYMBOL], this._savedCurrentPathname, 'prefix');
                    if (!haveSameProperties(subscriber.params, routeParams)) {
                        subscriber.params = routeParams;
                        subscriber.callback(routeParams || {});
                    }
                    break;
                case 'query':
                    queryParams = getURLQueryParams();
                    if (!haveSameProperties(subscriber.queryParams, queryParams)) {
                        subscriber.queryParams = queryParams;
                        subscriber.callback(queryParams || {});
                    }
                    break;
            }
        }
    }

    private _triggerRouterChangeSubscribers() {
        this._subscribers.forEach((subscriber) => {
            this._triggerRouterChangeSubscriber(subscriber);
        });
        this._subscribers = this._subscribers.filter((subscriber) => subscriber.isConnected());
    }

    public async navigate(url: string, replaceState: boolean = false, preventHistoryUpdate: boolean = false) {
        if (this._isSameRoute(url) || this._navigating) return;

        this._navigating = true;

        // check canDeactivate guards for routes that are activated and is about to deactivate
        const canDeactivate = await this._processCanDeactivate(url);
        if (!canDeactivate) {
            this._navigating = false;
            return;
        }

        // check canActivate guards for routes that are not yet activated and is about to activate
        const canActivate = await this._processCanActivate(url);
        if (!canActivate) {
            this._navigating = false;
            return;
        }

        const redirectTo = await this._processRedirects(url);
        if (redirectTo) {
            this._navigating = false;
            this.redirect(url, replaceState, preventHistoryUpdate);
            this.navigate(redirectTo, true);
            return;
        }

        // deactivate activated components
        const deactivateHandlers = await this._processDeactivations(url);

        // activate components that are needed to activate
        const activateHandlers = await this._processActivations(url);

        deactivateHandlers.forEach((handler) => handler());
        activateHandlers.forEach((handler) => handler());

        this.redirect(url, replaceState, preventHistoryUpdate);
        this._navigating = false;
    }

}