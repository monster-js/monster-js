import { InternalRouterService, RouteChangeSubscriberInterface } from "./internal-router.service";

export function routeQueryParamChange(fnComponent: any, callback: (queryParams?: Record<string, string>) => any) {
    const subscriber: RouteChangeSubscriberInterface = {
        type: 'query',
        callback,
        isConnected: () => fnComponent.isConnected,
        component: fnComponent,
        params: {},
        queryParams: {}
    };
    const internalRouterService = new InternalRouterService();
    internalRouterService.addSubscriber(subscriber);
}

