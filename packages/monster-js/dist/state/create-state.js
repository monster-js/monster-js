export function createState(classComponent, initValue) {
    const instance = classComponent;
    let value = Object.freeze(initValue);
    const getter = () => value;
    const setter = (newValue) => {
        if (value !== newValue) {
            value = Object.freeze(newValue);
            instance.detectChanges();
        }
    };
    return [getter, setter];
}
//# sourceMappingURL=create-state.js.map