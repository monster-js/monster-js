import { FunctionComponent, getSelector } from "@monster-js/core";
import { bootstrap, Module } from "@monster-js/core/module";
import { render } from "./render";

export function componentTester<T>(component: FunctionComponent, options: Omit<Omit<Module, 'root'>, 'exports'> = {}) {

    bootstrap({
        ...options,
        root: component
    });

    const selector = getSelector(component);

    return {
        selector,
        render: () => render(component)
    };
}
