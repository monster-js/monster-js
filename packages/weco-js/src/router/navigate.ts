import { RouterService } from "./router.service";

export function navigate(url: string) {
    const routerService = new RouterService();
    routerService.navigate(url);
}