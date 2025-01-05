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

    private static instance: InternalRouterService;

    private navigating: boolean;

    private readonly viewRoutes: ViewRouteInterface[] = [];

    private subscribers: RouteChangeSubscriberInterface[] = [];

    constructor() {
        if (InternalRouterService.instance) return InternalRouterService.instance;

        InternalRouterService.instance = this;
    }

    private isSameRoute(url: string) {
        const cleanNewUrl = removeStartAndEndSlashes(url);
        const cleanOldUrl = removeStartAndEndSlashes(window.location.pathname + window.location.search);
        return cleanNewUrl === cleanOldUrl;
    }

    private async processSingleCanActivate(url: string, route: ViewRouteInterface) {
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

    private async processCanActivate(url: string) {
        let canActivate = true;

        for (let i = 0; i < this.viewRoutes.length; i++) {
            const route = this.viewRoutes[i];
            const _aboutToActivate = await this.processSingleCanActivate(url, route);
            if (!_aboutToActivate) {
                canActivate = false;
            }
        }

        return canActivate;
    }

    private async processSingleCanDeactivate(url: string, route: ViewRouteInterface) {
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

    private async processCanDeactivate(url: string) {
        let canDeactivate = true;

        for (let i = 0; i < this.viewRoutes.length; i++) {
            const route = this.viewRoutes[i];
            const _canDeactivate = await this.processSingleCanDeactivate(url, route);
            if (!_canDeactivate) {
                canDeactivate = false;
            }
        }

        return canDeactivate;
    }

    private async processSingleRedirects(url: string, route: ViewRouteInterface) {
        const canRedirect = route.redirectTo && evaluateRoute(route.routerPath, url, route.pathMatch);
        if (canRedirect) {
            return route.redirectTo;
        }
        return null;
    }

    private async processRedirects(url: string) {
        let redirectTo: string = null;

        for (let i = 0; i < this.viewRoutes.length; i++) {
            if (!redirectTo) {
                const route = this.viewRoutes[i];
                const canRedirect =  await this.processSingleRedirects(url, route);
                if (canRedirect) {
                    redirectTo = route.redirectTo;
                }
            }
        }

        return redirectTo;
    }

    private async processDeactivations(url: string) {
        const handlers: (() => void)[] = [];
        for (let i = 0; i < this.viewRoutes.length; i++) {
            const route = this.viewRoutes[i];
            const shouldDeactivate = route.element && !evaluateRoute(route.routerPath, url, route.pathMatch);
            if (shouldDeactivate) {
                handlers.push(() => {
                    route.element.remove();
                    this.viewRoutes[i].element = null;
                });
            }
        }
        return handlers;
    }

    private async processSingleActivations(url: string, route: ViewRouteInterface) {
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

    private async processActivations(url: string) {
        const handlers: (() => void)[] = [];
        for (let i = 0; i < this.viewRoutes.length; i++) {
            const route = this.viewRoutes[i];
            const handler = await this.processSingleActivations(url, route);
            if (handler) {
                handlers.push(handler);
            }
        }
        return handlers;
    }

    public async addViewRoute(route: ViewRouteInterface) {
        this.viewRoutes.push(route);
        const canActivate = await this.processSingleCanActivate(window.location.pathname, route);
        if (!canActivate) return;

        // process redirects
        const redirectTo = await this.processSingleRedirects(window.location.pathname, route);
        if (redirectTo) {
            this.navigate(redirectTo);
            return;
        }

        // process activation
        const handler = await this.processSingleActivations(window.location.pathname, route);
        if (handler) handler();
    }

    public redirect(url: string, replaceState: boolean) {
        if (replaceState) {
            window.history.replaceState({}, '', url);
        }
        else {
            window.history.pushState({}, '', url);
        }

        this.triggerRouterChangeSubscribers();
    }

    public addSubscriber(subscriber: RouteChangeSubscriberInterface) {
        this.subscribers.push(subscriber);
        const webComponent = (subscriber.component as WebComponentInterface);
        const callback = () => {
            this.triggerRouterChangeSubscriber(subscriber);
            webComponent.removeTriggerAfterConnected(callback);
        };
        webComponent.addTriggerAfterConnected(callback);
    }

    private triggerRouterChangeSubscriber(subscriber: RouteChangeSubscriberInterface) {
        if (subscriber.isConnected()) {
            let routeParams: Record<string, string> = {};
            let queryParams: Record<string, string> = {};
            switch(subscriber.type) {
                case 'all':
                    queryParams = getURLQueryParams();
                    routeParams = evaluateRoute(subscriber.component[COMPONENT_URL_PATH_SYMBOL], window.location.pathname, 'prefix');
                    subscriber.callback(routeParams, queryParams);
                    break;
                case 'param':
                    routeParams = evaluateRoute(subscriber.component[COMPONENT_URL_PATH_SYMBOL], window.location.pathname, 'prefix');
                    if (!haveSameProperties(subscriber.params, routeParams)) {
                        subscriber.params = routeParams;
                        subscriber.callback(routeParams);
                    }
                    break;
                case 'query':
                    queryParams = getURLQueryParams();
                    if (!haveSameProperties(subscriber.queryParams, queryParams)) {
                        subscriber.queryParams = queryParams;
                        subscriber.callback(queryParams);
                    }
                    break;
            }
        }
    }

    private triggerRouterChangeSubscribers() {
        this.subscribers.forEach((subscriber) => {
            this.triggerRouterChangeSubscriber(subscriber);
        });
        this.subscribers = this.subscribers.filter((subscriber) => subscriber.isConnected());
    }

    public async navigate(url: string, replaceState: boolean = false) {
        if (this.isSameRoute(url) || this.navigating) return;

        this.navigating = true;

        // check canDeactivate guards for routes that are activated and is about to deactivate
        const canDeactivate = await this.processCanDeactivate(url);
        if (!canDeactivate) {
            this.navigating = false;
            return;
        }

        // check canActivate guards for routes that are not yet activated and is about to activate
        const canActivate = await this.processCanActivate(url);
        if (!canActivate) {
            this.navigating = false;
            return;
        }

        const redirectTo = await this.processRedirects(url);
        if (redirectTo) {
            this.navigating = false;
            this.redirect(url, replaceState);
            this.navigate(redirectTo, true);
            return;
        }

        // deactivate activated components
        const deactivateHandlers = await this.processDeactivations(url);

        // activate components that are needed to activate
        const activateHandlers = await this.processActivations(url);

        deactivateHandlers.forEach((handler) => handler());
        activateHandlers.forEach((handler) => handler());

        this.redirect(url, replaceState);
        this.navigating = false;
    }

}