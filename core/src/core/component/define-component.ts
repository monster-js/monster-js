import { createComponent } from "./create-component";

export function defineComponent(selector: string, fnComponent: any, options: ElementDefinitionOptions | undefined) {
    customElements.define(selector, createComponent(fnComponent), options);
}