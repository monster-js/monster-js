import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const onChangeDetection = (context: ComponentInstance, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onChangeDetection.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}