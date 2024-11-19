import { createWebComponent } from "./create-web-component";

export function defineComponent(selector: string, renderFunction: () => Element, parentClass = HTMLElement) {
    customElements.define(selector, createWebComponent(renderFunction, parentClass));
}
