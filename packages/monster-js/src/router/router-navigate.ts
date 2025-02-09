import { InternalRouterService } from "./internal-router.service";

export function routerNavigate(url: string, replaceState: boolean = false) {
    setTimeout(() => {
        const internalRouterService = new InternalRouterService();
        internalRouterService.navigate(url, replaceState);
    });
}
