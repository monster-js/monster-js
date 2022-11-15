import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const afterViewInit = (context: ComponentInstance, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.afterViewInit.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}