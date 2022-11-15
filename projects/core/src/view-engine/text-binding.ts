import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { Watcher } from "../watcher/interfaces/watcher.interface";

export const textBinding = (context: ComponentInstance, valueCaller: () => any): Text => {
    const val = valueCaller();
    const text = document.createTextNode(val);

    const watcher: Watcher = {
        val,
        isConnected: () => text.isConnected,
        isUpdated: () => {
            const newValue = valueCaller();
            if (watcher.val !== newValue) {
                watcher.val = newValue;
                return true;
            }
            return false;
        },
        update: (newValue: any) => text.textContent = newValue
    };

    context.__wrapper.watchers.push(watcher);

    return text;
}
