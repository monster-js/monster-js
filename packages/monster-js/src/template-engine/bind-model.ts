import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { setAttribute } from "./set-attribute";

export function bindModel(classComponent: any, model: [() => any, (value: any) => void], element: Element): Element {
    const instance: WebComponentInterface = classComponent;

    const [valueGetter, valueSetter] = model;
    const type = element.getAttribute('type') || 'text';

    if (element.localName === 'input' || element.localName === 'textarea') {
        const onInputTypes = ['text', 'password', 'email', 'search', 'tel', 'url', 'number', 'range', 'date', 'datetime-local', 'month', 'time', 'week', 'color', 'checkbox', 'radio', 'file'];

        if (onInputTypes.includes(type)) {
            element.addEventListener('input', (event) => {
                if (type === 'checkbox') {
                    valueSetter((event.target as any).checked);
                } else if (type === 'file') {
                    valueSetter([...(event.target as any).files]);
                } else {
                    valueSetter((event.target as any).value);
                }
            });
        } else {
            return element;
        }
    } else if (element.localName === 'select') {
        element.addEventListener('input', (event) => {
            valueSetter((event.target as any).value);
        });
    } else {
        return element;
    }

    const changeDetection: WatcherInterface = {
        hasChanges: false,
        value: undefined,
        getIsConnected: () => element.isConnected,
        evaluate: () => {
            const newValue = valueGetter();
            if (changeDetection.value !== newValue) {
                changeDetection.value = newValue;
                changeDetection.hasChanges = true;
            } else {
                changeDetection.hasChanges = false;
            }
        },
        handlerChange: (value: any) => {
            if (type === 'radio') {
                (element as any).checked = value === (element as any).value;
            } else if (type === 'checkbox') {
                (element as any).checked = value;
            } else if (type === 'file') {
            } else {
                setAttribute(element, 'value', value);
            }
        }
    };

    instance.addWatcher(changeDetection);

    return element;
}
