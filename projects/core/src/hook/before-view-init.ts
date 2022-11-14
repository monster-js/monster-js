import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const beforeViewInit = (context: ComponentInstance, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.beforeViewInit.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
