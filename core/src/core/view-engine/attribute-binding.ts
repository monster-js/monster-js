import { FunctionComponent } from "../component/interfaces/function-component.interface";
import { Watcher } from "../watcher/interfaces/watcher.interface";
import { setAttribute } from "./utils/set-attribute";
import { viewProps } from "./view-props";

export const attributeBinding = (context: FunctionComponent, element: HTMLElement, attributes: { [key: string]: () => any; }) => {
    if ((element as any).isCustomElement) {
        return viewProps(context, element as any, attributes);
    }

    let memoryValue: any = {};
    const watcher: Watcher = {
        val: {},
        isConnected: () => element.isConnected,
        isUpdated: () => {
            let isUpdated = false;

            for (const [key, value] of Object.entries(attributes)) {
                const newValue = value();
                if (watcher.val[key] !== newValue) isUpdated = true;
                watcher.val[key] = newValue;
            }

            return isUpdated;
        },
        update: ((newValue: { [key: string]: any }) => {
            for (const [key, value] of Object.entries(newValue)) {
                if (value !== memoryValue[key]) {
                    setAttribute(element, key, value);
                }
            };
            memoryValue = {...newValue};
        })
    };

    for (const [key, value] of Object.entries(attributes)) {
        const currentValue = value();
        watcher.val[key] = currentValue;
        element.setAttribute(key, currentValue);
    }
    memoryValue = {...watcher.val};

    context.__wrapper.watchers.push(watcher);
    return element;
}