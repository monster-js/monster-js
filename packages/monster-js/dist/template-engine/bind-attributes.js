import { setAttribute } from "./set-attribute";
export function bindAttributes(classComponent, element, attributes) {
    const instance = classComponent;
    Object.keys(attributes).forEach((key) => {
        const attributeName = key;
        const valueGetter = attributes[key];
        const changeDetection = {
            hasChanges: false,
            value: undefined,
            getIsConnected: () => element.isConnected,
            evaluate: () => {
                const newValue = valueGetter();
                if (changeDetection.value !== newValue) {
                    changeDetection.value = newValue;
                    changeDetection.hasChanges = true;
                }
                else {
                    changeDetection.hasChanges = false;
                }
            },
            handlerChange: (value) => {
                setAttribute(element, attributeName, value);
            }
        };
        instance.addWatcher(changeDetection);
    });
    return element;
}
//# sourceMappingURL=bind-attributes.js.map