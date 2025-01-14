import { InternalRouterService, RouteChangeSubscriberInterface } from "./internal-router.service";

export function routeParamChange(fnComponent: any, callback: (params?: Record<string, string>) => any) {
    const subscriber: RouteChangeSubscriberInterface = {
        type: 'param',
        callback,
        isConnected: () => fnComponent.isConnected,
        component: fnComponent,
        params: {},
        queryParams: {}
    };
    const internalRouterService = new InternalRouterService();
    internalRouterService.addSubscriber(subscriber);
}
