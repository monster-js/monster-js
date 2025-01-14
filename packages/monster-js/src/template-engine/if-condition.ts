import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";

export function ifCondition(classComponent: any, elementCreator: () => Element, valueGetter: () => any) {
    const instance: WebComponentInterface = classComponent;
    const comment = document.createComment(' if ');
    const fragment = document.createDocumentFragment();
    let element: Element;
    const changeDetection: WatcherInterface = {
        hasChanges: false,
        value: undefined,
        getIsConnected: () => comment.isConnected,
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
    // changeDetection.handlerChange(initialValue);
    instance.addConditionWatcher(changeDetection);

    return fragment;
}
