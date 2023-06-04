import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const adopted = (context: FunctionComponent, callback: () => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.adopted.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
