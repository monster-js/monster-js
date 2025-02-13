import { WebComponentInterface } from "../interfaces/web-component.interface";
import { createWatcher } from "../utils/create-watcher";

export function bindTextNode(classComponent: any, element: Text, valueGetter: () => any) {
    const instance: WebComponentInterface = classComponent;
    const overrideValueGetter = () => {
        const value = valueGetter();
        return value === undefined ? '' : value;
    }
    createWatcher(instance, undefined, () => element.isConnected, overrideValueGetter, (value: any) => {
        element.textContent = value;
    });

    return element;
}
