export function applyDirectives(componentInstance, element, directives) {
    const obj = {};
    directives.forEach(([namespace, name, valueCaller]) => {
        if (!obj[namespace]) {
            obj[namespace] = {};
        }
        obj[namespace][name] = valueCaller || (() => undefined);
    });
    let returnEl = element;
    Object.keys(obj).forEach((namespace) => {
        const directiveFn = componentInstance.getDirective(namespace);
        if (!directiveFn) {
            throw new Error(`The directive '${namespace}' is being used in the template but has not been registered in the corresponding component.`);
        }
        returnEl = directiveFn.bind(componentInstance)(returnEl, obj[namespace], element);
    });
    return returnEl;
}
//# sourceMappingURL=apply-directives.js.map