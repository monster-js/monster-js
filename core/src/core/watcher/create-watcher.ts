import { FunctionComponent } from "../../public_apis";
import { Watcher } from "./interfaces/watcher.interface";

export function createWatcher(
    valueCaller: () => any,
    element: HTMLElement,
    context: FunctionComponent,
    updateCallback: (value: any) => void
) {
    let value = valueCaller();

    const watcher: Watcher = {
        isConnected: () => element.isConnected,
        val: value,
        isUpdated: () => {
            const newValue = valueCaller();
            if (watcher.val !== newValue) {
                watcher.val = newValue;
                return true;
            }
            return false;
        },
        update: (newValue: any) => updateCallback(newValue)
    };

    context.__wrapper.watchers.push(watcher);
}
