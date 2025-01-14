import { createWebComponent } from "./create-web-component";
export const definedComponents = {};
export function defineComponent(renderFunction, overrideSelector = null) {
    const fnComponent = renderFunction;
    const selector = overrideSelector || fnComponent.__meta.selector;
    if (definedComponents[selector])
        return;
    let elementOptions;
    definedComponents[selector] = 1;
    if (fnComponent.__meta?.extends) {
        elementOptions = { extends: fnComponent.__meta.extends[1] };
        definedComponents[selector] = fnComponent.__meta.extends[1];
    }
    customElements.define(selector, createWebComponent(renderFunction), elementOptions);
}
//# sourceMappingURL=define-component.js.map