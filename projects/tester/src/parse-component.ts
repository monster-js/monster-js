import { ComponentWrapper } from "@monster-js/core/dist/component/interfaces/component-wrapper.interface";

export const parseComponent = (element: HTMLElement) => {
    const instance: ComponentWrapper = element as any;
    return {
        queryAll: (query: string) => instance.querySelectorAll(query),
        query: <T = HTMLElement>(query: string): T => instance.querySelector(query) as any,
        host: instance,
        element: instance.element,
        detectChanges: () => instance['_evaluate'](),
        shadowRoot: instance.componentShadowRoot
    };
}