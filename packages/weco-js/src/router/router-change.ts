import { InternalRouterService, RouteChangeSubscriberInterface } from "./internal-router.service";

export function routerChange(fnComponent: any, callback: (params?: Record<string, string>, queryParams?: Record<string, string>) => any) {
    const subscriber: RouteChangeSubscriberInterface = {
        type: 'all',
        callback,
        isConnected: () => fnComponent.isConnected,
        component: fnComponent
    };
    const internalRouterService = new InternalRouterService();
    internalRouterService.addSubscriber(subscriber);
}
