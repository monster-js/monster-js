import { ComponentInstance } from "../../component/interfaces/component-instance.interface";

export interface DirectiveArg {
    directive: { get: () => any, set?: (val?: any) => void; };
    element: HTMLElement;
    component: ComponentInstance;
}
