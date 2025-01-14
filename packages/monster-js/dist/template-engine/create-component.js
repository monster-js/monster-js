import { createElement } from "./create-element";
export function createComponent(fnComponentInput, attributes = null) {
    const fnComponent = fnComponentInput;
    let selector = fnComponent.__meta.selector;
    let allAttributes = attributes;
    if (fnComponent.__meta.extends) {
        allAttributes = { ...attributes, is: selector };
        selector = fnComponent.__meta.extends[1];
    }
    return createElement(selector, allAttributes);
}
//# sourceMappingURL=create-component.js.map