import { FunctionComponent } from "./function-component.interface";

export interface GlobalComponentAddReturn {
    addSelector(selector: string): GlobalComponentAddReturn;
    addComponent(fnComponent: FunctionComponent): GlobalComponentAddReturn;
    addExternal(selector: string): GlobalComponentAddReturn;
}