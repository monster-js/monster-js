import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const onInit = (context: FunctionComponent, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onInit.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
