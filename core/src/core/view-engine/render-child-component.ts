import { createComponent } from '../component/create-component';
import { createElement } from './create-element';

// should be moved in the polyfill
// window.monster__definedComponents = {}
const definedComponents: { [key: string]: number; } = {};

export const renderChildComponent = (name: string, component: () => HTMLElement, elementKey: string) => {
    let webComponent: CustomElementConstructor;
    let selector = (component as any).__selector;
    const defineComponent = (name: string, component: CustomElementConstructor, fnComponent: any) => {
        const extend: any = {};
        if (fnComponent.__localName) extend.extends = fnComponent.__localName;
        customElements.define(name, component, extend);
    }

    name = selector || name;

    if (!definedComponents[name]) {
        const definedElement = customElements.get(name); 
        if (definedElement) {
            webComponent = definedElement;
        } else {
            webComponent = createComponent(component, (component as any).__superClass);
            defineComponent(name, webComponent, component);
        }
        definedComponents[name] = 1;
    }
    return createElement(name, elementKey, (component as any).__localName);
};
