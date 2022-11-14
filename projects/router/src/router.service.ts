import { ComponentInstance, OnReceiveParent } from "@monster-js/core";
import { Observable } from "rxjs";
import { InternalService } from "./internal.service";

export class RouterService implements OnReceiveParent {

    private internalService = new InternalService();

    public navigate = this.internalService.navigate;
    public onRouteChange: Observable<any> = this.internalService.onRouteChange;

    constructor() {
        this.params = this.params.bind(this);
    }

    /**
     * For component props
     */
    private parentInstance: ComponentInstance;
    onReceiveParent(parent: any): void {
        this.parentInstance = parent;
    }

    public params(): { [key: string]: string };
    public params(key?: string): string;
    public params(key?: string) {
        if (!this.parentInstance.__wrapper) throw new Error('Params can only be accessed inside a component.');
        const paramCaller = this.parentInstance.__wrapper.props.params;
        if (paramCaller) {
            if (key) return paramCaller()[key];
            else return paramCaller();
        } else {
            return null;
        }
    }

}