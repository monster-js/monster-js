import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const onChangeDetection = (context: FunctionComponent, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onChangeDetection.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}