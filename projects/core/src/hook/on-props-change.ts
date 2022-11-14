import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const onPropsChange = (context: ComponentInstance, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onPropsChange.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
