import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const onViewChange = (context: FunctionComponent, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.onViewChange.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
