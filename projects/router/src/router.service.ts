import { Observable } from "rxjs";
import { InternalService } from "./internal.service";

export class RouterService {
    private internalService = new InternalService();
    public navigate = this.internalService.navigate;
    public onRouteChange: Observable<any> = this.internalService.onRouteChange;
}