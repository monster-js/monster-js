import { setAttribute } from "./set-attribute";

export function createElement(elementName: string, attributes: Record<any, any> = null) {
    const element = document.createElement(elementName);
    if (attributes) {
        Object.keys(attributes).forEach(key => setAttribute(element, key, attributes[key]));
    }
    return element;
}
