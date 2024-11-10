import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";

export function createWatcher(
    instance: WebComponentInterface,
    initialValue: any,
    getIsConnected: () => boolean,
    valueGetter: () => any,
    handlerChange: (value?: any) => void,
) {
    const watcher: WatcherInterface = {
        hasChanges: false,
        value: initialValue,
        getIsConnected,
        evaluate: () => {
            const newValue = valueGetter();
            if (watcher.value !== newValue) {
                watcher.value = newValue;
                watcher.hasChanges = true;
            } else {
                watcher.hasChanges = false;
            }
        },
        handlerChange
    };
    instance.addWatcher(watcher);
    return watcher;
}
