import { ComponentInstance } from "../../component/interfaces/component-instance.interface";
import { DirectiveArg } from "../../directive/interfaces/directive-arg.interface";
import { kebabToCamel } from "../../utils/kebab-to-camel";

export function directiveMethodCaller(
    key: string,
    directive: { get: () => any, set?: (val?: any) => void; },
    instance: any,
    component: ComponentInstance,
    element: HTMLElement
) {
    const param: DirectiveArg = {
        element,
        directive,
        component
    };
    const method = `$${kebabToCamel(key)}`;
    if (instance[method] && typeof instance[method] === 'function') instance[method](param);
}
