import { ComponentHost } from "../component/interfaces/component-host.interface";
import { FunctionComponent } from "../component/interfaces/function-component.interface";
import { kebabToCamel } from "../utils/kebab-to-camel";
import { Watcher } from "../watcher/interfaces/watcher.interface";

export const viewProps = (
    context: FunctionComponent,
    element: ComponentHost,
    props: { [key: string]: () => any; }
) => {
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
        update: (newValue: { [key: string]: any; }) => element.setProps(newValue)
    };
    watcher.isUpdated();
    watcher.update(watcher.val);
    context.__wrapper.watchers.push(watcher);

    return element;
}
