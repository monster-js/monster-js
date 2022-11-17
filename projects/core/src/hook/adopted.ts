import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const adopted = (context: ComponentInstance, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.adopted.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
