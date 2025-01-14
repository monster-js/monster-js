import { createWatcher } from "../utils/create-watcher";
export function bindTextNode(classComponent, element, valueGetter) {
    const instance = classComponent;
    // const initialValue = valueGetter();
    // const watcher = createWatcher(instance, initialValue, () => element.isConnected, valueGetter, (value: any) => {
    createWatcher(instance, undefined, () => element.isConnected, valueGetter, (value) => {
        element.textContent = value;
    });
    // watcher.handlerChange(initialValue);
    return element;
}
//# sourceMappingURL=bind-text-node.js.map