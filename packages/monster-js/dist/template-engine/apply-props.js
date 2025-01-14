import { setProps } from "../utils/props-store";
export function applyProps(instance, element, propsCallers) {
    const valueGetter = () => {
        let value = {};
        Object.keys(propsCallers).forEach((key) => {
            value[key] = propsCallers[key]();
        });
        return value;
    };
    const initialValue = valueGetter();
    const hasChanges = (obj1, obj2) => {
        let hasChange = false;
        Object.keys(obj1).forEach((key) => {
            if (obj1[key] !== obj2[key]) {
                hasChange = true;
            }
        });
        return hasChange;
    };
    const watcher = {
        hasChanges: false,
        value: initialValue,
        getIsConnected: () => element.isConnected,
        evaluate: () => {
            const newValue = valueGetter();
            if (hasChanges(watcher.value, newValue)) {
                watcher.value = newValue;
                watcher.hasChanges = true;
            }
            else {
                watcher.hasChanges = false;
            }
        },
        handlerChange: (value) => {
            setProps(element, value);
        }
    };
    watcher.handlerChange(initialValue);
    instance.addWatcher(watcher);
    return element;
}
//# sourceMappingURL=apply-props.js.map