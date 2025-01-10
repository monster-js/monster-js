import { FnComponentInterface } from "../interfaces/fn-component.interface";

export function component(fnComponent: any, config: FnComponentInterface['__meta'], styles?: string) {
    const meta: FnComponentInterface['__meta'] = config;
    fnComponent.__meta = meta;
    if (styles) {
        console.log(styles);
        fnComponent.__styleMeta = styles;
    }
    return fnComponent;
}
