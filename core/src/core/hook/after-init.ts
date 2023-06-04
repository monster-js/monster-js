import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const afterInit = (context: FunctionComponent, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.afterInit.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
