export function createSharedState(initValue) {
    let components = [];
    let value = Object.freeze(initValue);
    return function (componentInstance) {
        const getter = () => value;
        const setter = (newValue) => {
            if (value !== newValue) {
                value = Object.freeze(newValue);
                let newComponents = [];
                components.forEach((component) => {
                    if (component.isConnected) {
                        component.detectChanges();
                        newComponents.push(component);
                    }
                });
                components = newComponents;
            }
        };
        if (!components.includes(componentInstance)) {
            components.push(componentInstance);
        }
        return [getter, setter];
    };
}
//# sourceMappingURL=create-shared-state.js.map