import { getSelector } from "../utils/get-selector";
import { FunctionComponent } from "./interfaces/function-component.interface";
import { GlobalComponentAddReturn } from "./interfaces/global-component-add-return.interface";

class GlobalComponentsHolder {

    private static instance: GlobalComponentsHolder;

    public components: { [key: string]: any; } = {};
    public externalComponents: { [key: string]: any; } = {};

    private addReturn: GlobalComponentAddReturn = {
        addSelector: this.addSelector.bind(this),
        addComponent: this.addComponent.bind(this),
        addExternal: this.addExternal.bind(this)
    };

    constructor() {
        if (GlobalComponentsHolder.instance) return GlobalComponentsHolder.instance;
        GlobalComponentsHolder.instance = this;
    }

    public addExternal(selector: string) {
        this.externalComponents[selector] = true;
        return this.addReturn;
    }

    public addSelector(selector: string) {
        this.components[selector] = true;
        return this.addReturn;
    }

    public addComponent(fnComponent: FunctionComponent) {
        this.components[getSelector(fnComponent)] = true;
        return this.addReturn;
    }

    public getExternal(selector: string) {
        return this.externalComponents[selector];
    }

    public get(selector: string) {
        return this.components[selector];
    }

}

export const globalComponents = () => new GlobalComponentsHolder();
