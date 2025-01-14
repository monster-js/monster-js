import { InternalRouterService } from "./internal-router.service";
export function routerNavigate(url, replaceState = false) {
    const internalRouterService = new InternalRouterService();
    internalRouterService.navigate(url, replaceState);
}
//# sourceMappingURL=router-navigate.js.map