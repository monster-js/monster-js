import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const onInit = (context: ComponentInstance, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onInit.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}