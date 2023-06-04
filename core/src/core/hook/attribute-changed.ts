import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const attributeChanged = (context: FunctionComponent, callback: (name: string, oldValue: any, newValue: any) => void, isConnected?: () => boolean) => {
    context.__wrapper.hooks.attributeChanged.push({
        isConnected: isConnected || (() => true),
        hook: callback
    });
}
