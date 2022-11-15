import { setAttribute } from "./utils/set-attribute";

export const addAttributes = (element: HTMLElement, attributes: { [key: string]: any; }) => {
    Object.keys(attributes).forEach(key => setAttribute(element, key, attributes[key]));
    return element;
}
