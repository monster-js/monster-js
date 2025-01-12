import { setAttribute } from "./set-attribute";

export function createElement(elementName: string, attributes: Record<any, any> = null) {
    let option: ElementCreationOptions;
    if (attributes.is) {
        option = { is: attributes.is };
    }
    const element = document.createElement(elementName, option);
    if (attributes) {
        Object.keys(attributes).forEach(key => setAttribute(element, key, attributes[key]));
    }
    return element;
}
