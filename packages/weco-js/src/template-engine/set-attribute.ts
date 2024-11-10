export function setAttribute(element: Element, name: string, value: any) {
    const directSetAttributes = ['value'];
    if (directSetAttributes.includes(name)) {
        (element as any)[name] = value;
    } else {
        element.setAttribute(name, value);
    }
    return element;
}
