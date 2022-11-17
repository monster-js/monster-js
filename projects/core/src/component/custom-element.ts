import { FunctionComponent } from "./interfaces/function-component.interface";

export const customElement = (fnComponent: FunctionComponent, superClass: CustomElementConstructor, extendsElement: string) => {
    if (!fnComponent.config) fnComponent.config = {};
    fnComponent.config.superClass = superClass;
    fnComponent.config.extendsElement = extendsElement;
}
