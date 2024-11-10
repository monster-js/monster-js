import { FnComponentInterface } from "../interfaces/fn-component.interface";

export function component(fnComponent: any, selector: string, parentClass?: CustomElementConstructor) {
    const meta: FnComponentInterface['__meta'] = {
        selector,
        parentClass
    };
    fnComponent.__meta = meta;
}
