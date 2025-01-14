import { defineComponent } from "../component/define-component";
import { FnComponentInterface } from "../interfaces/fn-component.interface";

export function component(fnComponent: any, config: FnComponentInterface['__meta'], styles?: any) {
    const meta: FnComponentInterface['__meta'] = config;
    const selector = config.selector;

    fnComponent.__meta = meta;

    if (styles) fnComponent.__styleMeta = styles;

    if (!customElements.get(selector)) defineComponent(fnComponent);

    return fnComponent;
}
