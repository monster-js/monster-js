import { FnComponentInterface } from "../interfaces/fn-component.interface";

export function component(fnComponent: any, config: FnComponentInterface['__meta']) {
    const meta: FnComponentInterface['__meta'] = config;
    fnComponent.__meta = meta;
    return fnComponent;
}
