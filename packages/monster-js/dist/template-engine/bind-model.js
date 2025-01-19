import { setAttribute } from "./set-attribute";
export function bindModel(classComponent, model, element) {
    const instance = classComponent;
    const [valueGetter, valueSetter] = model;
    const type = element.getAttribute('type') || 'text';
    if (element.localName === 'input' || element.localName === 'textarea') {
        const onInputTypes = ['text', 'password', 'email', 'search', 'tel', 'url', 'number', 'range', 'date', 'datetime-local', 'month', 'time', 'week', 'color', 'checkbox', 'radio', 'file'];
        if (onInputTypes.includes(type)) {
            element.addEventListener('input', (event) => {
                if (type === 'checkbox') {
                    valueSetter(event.target.checked);
                }
                else {
                    valueSetter(event.target.value);
                }
            });
        }
        else {
            return element;
        }
    }
    else if (element.localName === 'select') {
        element.addEventListener('input', (event) => {
            valueSetter(event.target.value);
        });
    }
    else {
        return element;
    }
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
            if (type === 'radio') {
                element.checked = value === element.value;
            }
            else if (type === 'checkbox') {
                element.checked = value;
            }
            else {
                setAttribute(element, 'value', value);
            }
        }
    };
    instance.addWatcher(changeDetection);
    return element;
}
//# sourceMappingURL=bind-model.js.map