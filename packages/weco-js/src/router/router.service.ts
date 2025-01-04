import { InternalRouterService } from "./internal-router.service";

export class RouterService {

    private readonly internalRouterService: InternalRouterService;

    constructor() {
        this.internalRouterService = new InternalRouterService();
    }

    public navigate(url: string) {
        this.internalRouterService.navigate(url);
    }

}
