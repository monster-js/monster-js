import { ComponentInstance, FunctionComponent, getSelector } from "@monster-js/core";

export function fakeDefineComponent(target: ComponentInstance, component: FunctionComponent) {
    if (!target.__wrapper.fakeDefinedComponents) target.__wrapper.fakeDefinedComponents = {
        name: null,
        components: []
    };
    target.__wrapper.fakeDefinedComponents.components[getSelector(component)] = 1;
}