import { InternalRouterService } from "./internal-router.service";
export function routeParamChange(fnComponent, callback) {
    const subscriber = {
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
//# sourceMappingURL=route-param-change.js.map