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
        returnEl = directiveFn.bind(componentInstance)(returnEl, obj[namespace], element);
    });
    return returnEl;
}
