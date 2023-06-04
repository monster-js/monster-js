import { setAttribute } from "./utils/set-attribute";

export const setAttributes = (element: HTMLElement, attributes: { [key: string]: any; }) => {
    Object.keys(attributes).forEach(key => setAttribute(element, key, attributes[key]));
    return element;
}
