import { InternalRouterService } from "./internal-router.service";
export function routerChange(fnComponent, callback) {
    const subscriber = {
        type: 'all',
        callback,
        isConnected: () => fnComponent.isConnected,
        component: fnComponent,
        queryParams: {},
        params: {}
    };
    const internalRouterService = new InternalRouterService();
    internalRouterService.addSubscriber(subscriber);
}
//# sourceMappingURL=router-change.js.map