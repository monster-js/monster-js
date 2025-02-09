import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { evaluateWatcher } from "../utils/evaluate-watcher";

export function ifCondition(classComponent: any, elementCreator: () => Element, valueGetter: () => any) {
    const instance: WebComponentInterface = classComponent;
    const comment = document.createComment(' if ');
    const fragment = document.createDocumentFragment();
    let element: Element;
    const watcher: WatcherInterface = {
        hasChanges: false,
        value: undefined,
        getIsConnected: () => comment.isConnected,
        evaluate() {
            const newValue = valueGetter();
            if (watcher.value !== newValue) {
                watcher.value = newValue;
                watcher.hasChanges = true;
            } else {
                watcher.hasChanges = false;
            }
        },
        handlerChange(value: any) {
            if (value) {
                element = elementCreator();
                comment.after(element);
            } else if (element) {
                element.remove();
                element = null;
            }
        }
    };

    fragment.appendChild(comment);

    if (instance.isConnected) {
        // if component instance is already connected,
        // we should evaluate the new watcher because the change detection after component is connected will not run again
        evaluateWatcher(watcher, true);
    }

    instance.addIfConditionWatcher(watcher);

    return fragment;
}
