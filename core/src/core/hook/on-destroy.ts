import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const onDestroy = (context: FunctionComponent, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onDestroy.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}