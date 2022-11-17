import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const onDestroy = (context: ComponentInstance, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onDestroy.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}