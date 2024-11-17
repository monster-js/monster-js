import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";

export function forLoop(classComponent: any, elementCreator: (index: number) => Element, valueGetter: () => any[]) {
    const instance: WebComponentInterface = classComponent;
    const comment = document.createComment(' if ');
    const fragment = document.createDocumentFragment();
    const initialValue = valueGetter();
    let elements: Element[] = [];
    const watcher: WatcherInterface = {
        hasChanges: false,
        value: {
            oldValue: [],
            newValue: initialValue
        },
        getIsConnected: () => comment.isConnected,
        evaluate: () => {
            const newValue = valueGetter();
            if (watcher.value.oldValue.length !== newValue.length) {
                watcher.value.newValue = newValue;
                watcher.hasChanges = true;
            } else {
                watcher.hasChanges = false;
            }
        },
        handlerChange: ({ oldValue, newValue }: any) => {
            const min = Math.min(oldValue.length, newValue.length);
            const max = Math.max(oldValue.length, newValue.length);

            for (let i = min; i < max; i++) {
                if (!(i in oldValue)) {
                    // create element
                    const before = elements[elements.length - 1] || comment;
                    elements[i] = elementCreator(i);
                    before.after(elements[i]);
                }
                if (!(i in newValue)) {
                    // remove element
                    elements[i].remove();
                    elements[i] = null;
                }
            }

            elements = elements.filter(element => !!element);
            watcher.value.oldValue = newValue;
            delete watcher.value.newValue;
        }
    };

    fragment.appendChild(comment);
    // watcher.handlerChange(watcher.value);
    instance.addConditionWatcher(watcher);

    return fragment;
}