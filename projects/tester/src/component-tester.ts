import { FunctionComponent, getSelector, globalComponents } from "@monster-js/core";
import { bootstrap, Module } from "@monster-js/core/module";
import { render } from "./render";

interface ComponentTesterOptions extends Omit<Omit<Module, 'root'>, 'exports'> {
    externalComponents?: string[];
}

export function componentTester(component: FunctionComponent, options: ComponentTesterOptions = {}) {

    bootstrap({ ...options, root: component });

    const selector = getSelector(component);
    (options.externalComponents || []).forEach(selector => globalComponents().addExternal(selector));

    return {
        selector,
        render: () => render(component)
    };
}
