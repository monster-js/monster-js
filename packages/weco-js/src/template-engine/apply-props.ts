import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { PROPS_SYMBOL } from "../utils/props-symbol";

export function applyProps(instance: WebComponentInterface, element: HTMLElement, propsCallers: Record<string, () => any>) {
    const valueGetter = () => {
        let value: Record<any, any> = {};
        Object.keys(propsCallers).forEach((key) => {
            value[key] = propsCallers[key]();
        });
        return value;
    }
    const initialValue = valueGetter();
    const hasChanges = (obj1: Record<string, any>, obj2: Record<string, any>) => {
        let hasChange = false;
        Object.keys(obj1).forEach((key) => {
            if (obj1[key] !== obj2[key]) {
                hasChange = true;
            }
        });
        return hasChange;
    };

    const watcher: WatcherInterface = {
        hasChanges: false,
        value: initialValue,
        getIsConnected: () => element.isConnected,
        evaluate: () => {
            const newValue = valueGetter();
            if (hasChanges(watcher.value, newValue)) {
                watcher.value = newValue;
                watcher.hasChanges = true;
            } else {
                watcher.hasChanges = false;
            }
        },
        handlerChange: (value: any) => {
            (element as any)[PROPS_SYMBOL](value);
        }
    };
    instance.addWatcher(watcher);
    return element;
}
