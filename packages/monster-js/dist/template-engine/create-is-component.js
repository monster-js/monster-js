import { createElement } from "./create-element";
export function createIsComponent(tagName, attributes = null) {
    console.log(tagName, attributes);
    return createElement(tagName, attributes);
}
//# sourceMappingURL=create-is-component.js.map