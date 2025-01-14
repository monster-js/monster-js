import { InternalRouterService } from "./internal-router.service";
export class RouterService {
    constructor() {
        this.internalRouterService = new InternalRouterService();
    }
    navigate(url) {
        this.internalRouterService.navigate(url);
    }
}
//# sourceMappingURL=router.service.js.map