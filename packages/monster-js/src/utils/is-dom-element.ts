export function isDOMElement(variable: any) {
    return variable instanceof (variable?.ownerDocument?.defaultView?.Element || Element);
}
