const propsStore = new WeakMap();
export function setProps(target, value) {
    propsStore.set(target, value);
    if (target.isConnected) {
        target.detectChanges();
    }
}
export function getProps(target) {
    return propsStore.get(target);
}
//# sourceMappingURL=props-store.js.map