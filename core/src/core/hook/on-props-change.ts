import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const onPropsChange = (context: FunctionComponent, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onPropsChange.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
