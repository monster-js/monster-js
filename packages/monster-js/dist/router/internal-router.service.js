import { createComponent } from "../template-engine/create-component";
import { getURLQueryParams } from "../utils/get-url-query-params";
import { haveSameProperties } from "../utils/have-same-properties";
import { removeStartAndEndSlashes } from "../utils/remove-start-and-end-slashes";
import { evaluateRoute } from "./evaluate-route";
export const COMPONENT_URL_PATH_SYMBOL = Symbol('COMPONENT_URL_PATH_SYMBOL');
export class InternalRouterService {
    constructor() {
        this._viewRoutes = [];
        this._subscribers = [];
        if (InternalRouterService._instance)
            return InternalRouterService._instance;
        InternalRouterService._instance = this;
    }
    _isSameRoute(url) {
        const cleanNewUrl = removeStartAndEndSlashes(url);
        const cleanOldUrl = removeStartAndEndSlashes(window.location.pathname + window.location.search);
        return cleanNewUrl === cleanOldUrl;
    }
    async _processSingleCanActivate(url, route) {
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
    async _processCanActivate(url) {
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
    async _processSingleCanDeactivate(url, route) {
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
    async _processCanDeactivate(url) {
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
    async _processSingleRedirects(url, route) {
        const canRedirect = route.redirectTo && evaluateRoute(route.routerPath, url, route.pathMatch);
        if (canRedirect) {
            return route.redirectTo;
        }
        return null;
    }
    async _processRedirects(url) {
        let redirectTo = null;
        for (let i = 0; i < this._viewRoutes.length; i++) {
            if (!redirectTo) {
                const route = this._viewRoutes[i];
                const canRedirect = await this._processSingleRedirects(url, route);
                if (canRedirect) {
                    redirectTo = route.redirectTo;
                }
            }
        }
        return redirectTo;
    }
    async _processDeactivations(url) {
        const handlers = [];
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
    async _processSingleActivations(url, route) {
        let handler = null;
        const shouldActivate = !route.element && evaluateRoute(route.routerPath, url, route.pathMatch);
        if (shouldActivate) {
            const component = await route.rawComponent();
            handler = () => {
                const element = createComponent(component);
                element[COMPONENT_URL_PATH_SYMBOL] = route.routerPath;
                route.element = element;
                route.comment.after(element);
            };
        }
        return handler;
    }
    async _processActivations(url) {
        const handlers = [];
        for (let i = 0; i < this._viewRoutes.length; i++) {
            const route = this._viewRoutes[i];
            const handler = await this._processSingleActivations(url, route);
            if (handler) {
                handlers.push(handler);
            }
        }
        return handlers;
    }
    async addViewRoute(route) {
        this._viewRoutes.push(route);
        const canActivate = await this._processSingleCanActivate(window.location.pathname, route);
        if (!canActivate)
            return;
        // process redirects
        const redirectTo = await this._processSingleRedirects(window.location.pathname, route);
        if (redirectTo) {
            this.navigate(redirectTo);
            return;
        }
        // process activation
        const handler = await this._processSingleActivations(window.location.pathname, route);
        if (handler)
            handler();
    }
    redirect(url, replaceState) {
        if (replaceState) {
            window.history.replaceState({}, '', url);
        }
        else {
            window.history.pushState({}, '', url);
        }
        this._triggerRouterChangeSubscribers();
    }
    addSubscriber(subscriber) {
        this._subscribers.push(subscriber);
        const webComponent = subscriber.component;
        const callback = () => {
            this._triggerRouterChangeSubscriber(subscriber);
            webComponent.removeTriggerAfterConnected(callback);
        };
        webComponent.addTriggerAfterConnected(callback);
    }
    _triggerRouterChangeSubscriber(subscriber) {
        if (subscriber.isConnected()) {
            let routeParams = {};
            let queryParams = {};
            switch (subscriber.type) {
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
    _triggerRouterChangeSubscribers() {
        this._subscribers.forEach((subscriber) => {
            this._triggerRouterChangeSubscriber(subscriber);
        });
        this._subscribers = this._subscribers.filter((subscriber) => subscriber.isConnected());
    }
    async navigate(url, replaceState = false) {
        if (this._isSameRoute(url) || this._navigating)
            return;
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
            this.redirect(url, replaceState);
            this.navigate(redirectTo, true);
            return;
        }
        // deactivate activated components
        const deactivateHandlers = await this._processDeactivations(url);
        // activate components that are needed to activate
        const activateHandlers = await this._processActivations(url);
        deactivateHandlers.forEach((handler) => handler());
        activateHandlers.forEach((handler) => handler());
        this.redirect(url, replaceState);
        this._navigating = false;
    }
}
//# sourceMappingURL=internal-router.service.js.map