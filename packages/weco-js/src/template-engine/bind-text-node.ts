import { WebComponentInterface } from "../interfaces/web-component.interface";
import { createWatcher } from "../utils/create-watcher";

export function bindTextNode(classComponent: any, element: Text, valueGetter: () => any) {
    const instance: WebComponentInterface = classComponent;
    const initialValue = valueGetter();
    // const watcher = createWatcher(instance, initialValue, () => element.isConnected, valueGetter, (value: any) => {
    createWatcher(instance, initialValue, () => element.isConnected, valueGetter, (value: any) => {
        element.textContent = value;
    });

    // watcher.handlerChange(initialValue);

    return element;
}
