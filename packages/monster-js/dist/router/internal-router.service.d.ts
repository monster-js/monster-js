export interface ViewRouteInterface {
    comment: Comment;
    element: Element;
    rawComponent: () => Promise<any>;
    canActivate: any[];
    canDeactivate: any[];
    routerData: any;
    routerPath: string;
    pathMatch: 'full' | 'prefix';
    redirectTo: string;
}
export interface RouteChangeSubscriberInterface {
    type: 'all' | 'param' | 'query';
    callback: (...args: any[]) => any;
    isConnected: () => boolean;
    component: any;
    params: Record<string, string>;
    queryParams: Record<string, string>;
}
export declare const COMPONENT_URL_PATH_SYMBOL: unique symbol;
export declare class InternalRouterService {
    private static _instance;
    private _navigating;
    private readonly _viewRoutes;
    private _subscribers;
    constructor();
    private _isSameRoute;
    private _processSingleCanActivate;
    private _processCanActivate;
    private _processSingleCanDeactivate;
    private _processCanDeactivate;
    private _processSingleRedirects;
    private _processRedirects;
    private _processDeactivations;
    private _processSingleActivations;
    private _processActivations;
    addViewRoute(route: ViewRouteInterface): Promise<void>;
    redirect(url: string, replaceState: boolean): void;
    addSubscriber(subscriber: RouteChangeSubscriberInterface): void;
    private _triggerRouterChangeSubscriber;
    private _triggerRouterChangeSubscribers;
    navigate(url: string, replaceState?: boolean): Promise<void>;
}
