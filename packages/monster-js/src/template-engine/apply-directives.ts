import { WebComponentInterface } from "../interfaces/web-component.interface";
import { DirectiveDataType } from "../types/directive-data.type";

export function applyDirectives(
    componentInstance: WebComponentInterface,
    element: Element,
    directives: [string, string, () => any][]
) {
    const obj: Record<string, DirectiveDataType> = {};

    directives.forEach(([namespace, name, valueCaller]) => {
        if (!obj[namespace]) {
            obj[namespace] = {};
        }
        obj[namespace][name] = valueCaller || (() => undefined);
    });

    let returnEl: Element = element;
    Object.keys(obj).forEach((namespace) => {
        const directiveFn = componentInstance.getDirective(namespace);
        if (!directiveFn) {
            throw new Error(`The directive '${namespace}' is being used in the template but has not been registered in the corresponding component.`);
        }
        returnEl = directiveFn.bind(componentInstance)(returnEl, obj[namespace], element);
    });
    return returnEl;
}
