import { FnComponentInterface } from "../interfaces/fn-component.interface";
import { createWebComponent } from "./create-web-component";

export const definedComponents: Record<string, any> = {};

export function defineComponent(renderFunction: () => Element, overrideSelector: string = null) {
    const fnComponent: FnComponentInterface = renderFunction as any;
    const selector = overrideSelector || fnComponent.__meta.selector;
    if (definedComponents[selector]) return;
    let elementOptions: ElementDefinitionOptions;
    definedComponents[selector] = 1;
    if (fnComponent.__meta?.extends) {
        elementOptions = { extends: fnComponent.__meta.extends[1] };
        definedComponents[selector] = fnComponent.__meta.extends[1];
    }

    customElements.define(selector, createWebComponent(renderFunction), elementOptions);
}
