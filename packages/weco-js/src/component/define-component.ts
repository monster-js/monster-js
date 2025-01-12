import { FnComponentInterface } from "../interfaces/fn-component.interface";
import { createWebComponent } from "./create-web-component";

const definedComponents: Record<string, boolean> = {};

export function defineComponent(renderFunction: () => Element, overrideSelector: string = null) {
    const fnComponent: FnComponentInterface = renderFunction as any;
    const selector = overrideSelector || fnComponent.__meta.selector;
    if (definedComponents[selector]) return;
    let elementOptions: ElementDefinitionOptions;
    if (fnComponent.__meta?.extends) {
        elementOptions = { extends: fnComponent.__meta.extends[1] };
    }

    definedComponents[selector] = true;
    customElements.define(selector, createWebComponent(renderFunction), elementOptions);
}
