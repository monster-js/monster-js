import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { setAttribute } from "./set-attribute";

export function bindAttributes(classComponent: any, element: Element, attributes: Record<any, () => any>) {
    const instance: WebComponentInterface = classComponent;

    Object.keys(attributes).forEach((key) => {
        const attributeName = key;
        const valueGetter = attributes[key];

        const changeDetection: WatcherInterface = {
            hasChanges: false,
            value: undefined,
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

        instance.addWatcher(changeDetection);
    });

    return element;
}
