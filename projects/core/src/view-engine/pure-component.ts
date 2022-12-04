import { ComponentInstance } from "../core";
import { kebabToCamel } from "../utils/kebab-to-camel";
import { Watcher } from "../watcher/interfaces/watcher.interface";

export const pureComponent = (
    context: ComponentInstance,
    component: (props: { [key: string]: any; }) => HTMLElement,
    props: { [key: string]: () => any; } = {}
) => {
    let element: HTMLElement;

    const watcher: Watcher = {
        val: {},
        isConnected: () => element.isConnected,
        isUpdated: () => {
            let hasChanges = false;
            for (const [key, value] of Object.entries(props)) {
                const newValue = value();
                if (watcher.val[kebabToCamel(key)] !== newValue) hasChanges = true;
                watcher.val[kebabToCamel(key)] = newValue;
            }
            return hasChanges;
        },
        update: () => {}
    };
    watcher.isUpdated();
    context.__wrapper.watchers.push(watcher);

    element = component.bind(context)(watcher.val);

    if ((component as any).config.styles)
        setTimeout(() => context.__wrapper.useStyle((component as any).config.styles));

    return element;
}