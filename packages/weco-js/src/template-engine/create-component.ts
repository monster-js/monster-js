import { FnComponentInterface } from "../interfaces/fn-component.interface";
import { createElement } from "./create-element";

export function createComponent(fnComponentInput: any, attributes: Record<any, any> = null) {
    const fnComponent: FnComponentInterface = fnComponentInput;
    let selector = fnComponent.__meta.selector;
    let allAttributes = attributes;
    if (fnComponent.__meta.extends) {
        allAttributes = { ...attributes, is: selector };
        selector = fnComponent.__meta.extends[1];
    }
    return createElement(selector, allAttributes);
}
