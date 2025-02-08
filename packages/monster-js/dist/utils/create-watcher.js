export function createWatcher(instance, initialValue, getIsConnected, valueGetter, handlerChange) {
    const watcher = {
        hasChanges: false,
        value: initialValue,
        getIsConnected,
        evaluate() {
            const newValue = valueGetter();
            if (watcher.value === newValue) {
                watcher.hasChanges = false;
            }
            else {
                watcher.value = newValue;
                watcher.hasChanges = true;
            }
        },
        handlerChange,
    };
    instance.addWatcher(watcher);
    return watcher;
}
//# sourceMappingURL=create-watcher.js.map