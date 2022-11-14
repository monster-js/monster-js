import { ComponentWrapper } from "../component/interfaces/component-wrapper.interface";
import { Watcher } from "./interfaces/watcher.interface";

export function doCreateWatcher(
    valueCaller: () => any,
    element: HTMLElement,
    componentWrapper: ComponentWrapper,
    updateCallback: (value: any) => void,
    isConditionWatcher: boolean = false
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

    if (isConditionWatcher) {
        componentWrapper.conditionWatchers.push(watcher);
    } else {
        componentWrapper.watchers.push(watcher);
    }
}
