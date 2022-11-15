import { FunctionComponent } from "./interfaces/function-component.interface";

export const defineComponent = (fnComponent: FunctionComponent, customSelector?: string) => {
    const { extendsElement, selector } = fnComponent.config;
    customElements.define(customSelector || selector, fnComponent as any, { extends: extendsElement });
}
