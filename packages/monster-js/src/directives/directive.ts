export function directive(directiveFn: Function, namespace: string) {
    (directiveFn as any).namespace = namespace;
    return directiveFn;
}
