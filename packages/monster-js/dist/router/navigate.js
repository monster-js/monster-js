import { RouterService } from "./internal-router.service";
export function navigate(url) {
    const routerService = new RouterService();
    routerService.navigate(url);
}
//# sourceMappingURL=navigate.js.map