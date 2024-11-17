import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { setAttribute } from "./set-attribute";

export function bindAttributes(classComponent: any, element: Element, attributes: Record<any, () => any>) {
    const instance: WebComponentInterface = classComponent;

    Object.keys(attributes).forEach((key) => {
        const attributeName = key;
        const valueGetter = attributes[key];
        const initialValue = valueGetter();

        const changeDetection: WatcherInterface = {
            hasChanges: false,
            value: initialValue,
            getIsConnected: () => element.isConnected,
            evaluate: () => {
                const newValue = valueGetter();
                if (changeDetection.value !== newValue) {
                    changeDetection.value = newValue;
                    changeDetection.hasChanges = true;
                } else {
                    changeDetection.hasChanges = false;
                }
            },
            handlerChange: (value: any) => {
                setAttribute(element, attributeName, value);
            }
        };

        // changeDetection.handlerChange(initialValue);
        instance.addWatcher(changeDetection);
    });

    return element;
}
