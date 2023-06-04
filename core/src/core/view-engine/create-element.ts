import { setAttribute } from "./utils/set-attribute";

export const createElement = (name: string, elementKey: string, isAttribute?: string) => {
    if (name === 'fragment') {
        return document.createDocumentFragment()
    } else {
        const element = isAttribute ? document.createElement(isAttribute, { is: name }) : document.createElement(name);
        if (isAttribute) {
            (element as any).isCustomElement = true;
        }
        setAttribute(element, elementKey, '');
        return element;
    }
};