import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const observedAttributes = (fnComponent: FunctionComponent, ...attributes: string[]) => {
    if (!fnComponent.config) fnComponent.config = {};
    fnComponent.config.observedAttributes = attributes;
}