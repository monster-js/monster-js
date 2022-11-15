import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const attributeChanged = (context: ComponentInstance, callback: (name?: string, oldValue?: any, newValue?: any) => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.attributeChanged.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
