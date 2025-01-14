import { definedComponents } from "../component/define-component";
import { createElement } from "./create-element";
export function createStringComponent(elementName, attributes = null) {
    const allAttributes = { ...(attributes || {}) };
    if (typeof definedComponents[elementName] === 'string') {
        allAttributes.is = elementName;
        return createElement(definedComponents[elementName], allAttributes);
    }
    return createElement(elementName, attributes);
}
//# sourceMappingURL=create-string-component.js.map