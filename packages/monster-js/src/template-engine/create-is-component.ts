import { createElement } from "./create-element";

export function createIsComponent(tagName: any, attributes: Record<any, any> = null) {
    console.log(tagName, attributes);
    return createElement(tagName, attributes);
}
