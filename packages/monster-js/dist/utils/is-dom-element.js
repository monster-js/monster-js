export function isDOMElement(variable) {
    return variable instanceof (variable?.ownerDocument?.defaultView?.Element || Element);
}
//# sourceMappingURL=is-dom-element.js.map