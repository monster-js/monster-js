import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const onViewChange = (context: ComponentInstance, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onViewChange.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
