import { globalComponents } from "../component/global-components";
import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const renderChild = (tag: string, context: ComponentInstance): HTMLElement => {

    const { definedComponents, fakeDefinedComponents } = context.__wrapper;

    // fakeDefinedComponents is used in router component
    if (!definedComponents.components[tag] && !(fakeDefinedComponents?.components || {})[tag]) {
        const global = globalComponents();
        if (global.getExternal(tag)) return document.createElement(tag);
        if (!global.get(tag)) throw new Error(`The component '${tag}' is not defined in ${definedComponents.name} and is not defined as a global component.`);
    }

    return new (customElements.get(tag));
}
