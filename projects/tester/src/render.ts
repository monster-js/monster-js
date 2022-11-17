import { FunctionComponent, getSelector } from "@monster-js/core";
import { ComponentWrapper } from "@monster-js/core/dist/component/interfaces/component-wrapper.interface";
import { RenderReturnInterface } from "./interfaces/render-return.interface";

export const render = (component: FunctionComponent): RenderReturnInterface => {
        const defined = customElements.get(getSelector(component));
        const instance: ComponentWrapper = new defined() as any;
        document.body.appendChild(instance);
        return {
            queryAll: (query: string) => instance.querySelectorAll(query),
            query: <T = HTMLElement>(query: string): T => instance.querySelector(query) as any,
            host: instance,
            element: instance.element,
            detectChanges: () => instance['_evaluate'](),
            shadowRoot: instance.componentShadowRoot
        };
}