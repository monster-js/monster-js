export const createElement = (name: string, elementKey: string, isAttribute: string): HTMLElement => {
    const element = document.createElement(name, { is: isAttribute });
    if (elementKey) element.setAttribute(elementKey, '');
    return element;
}