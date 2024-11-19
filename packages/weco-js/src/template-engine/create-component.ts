import { FnComponentInterface } from "../interfaces/fn-component.interface";
import { createElement } from "./create-element";
import { defineComponent } from "../component/define-component";

export function createComponent(fnComponentInput: any, attributes: Record<any, any> = null) {
    const fnComponent: FnComponentInterface = fnComponentInput;
    const { selector, parentClass } = fnComponent.__meta;
    if (!customElements.get(selector)) {
        defineComponent(selector, fnComponent as any, parentClass)
    }
    return createElement(fnComponent.__meta.selector, attributes);
}
