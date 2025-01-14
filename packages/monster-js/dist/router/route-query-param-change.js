import { InternalRouterService } from "./internal-router.service";
export function routeQueryParamChange(fnComponent, callback) {
    const subscriber = {
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
//# sourceMappingURL=route-query-param-change.js.map