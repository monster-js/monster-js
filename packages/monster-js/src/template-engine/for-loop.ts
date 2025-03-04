import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { evaluateWatcher } from "../utils/evaluate-watcher";

export function forLoop(
    classComponent: any,
    elementCreator: (index: number) => Element,
    valueGetter: () => any[],
    trackBy: string = null
) {
    const instance: WebComponentInterface = classComponent;
    const comment = document.createComment(' for ');
    const fragment = document.createDocumentFragment();
    let elementsArray: Element[] = [];
    const watcher: WatcherInterface = {
        hasChanges: false,
        value: {
            oldValue: [],
            newValue: []
        },
        getIsConnected: () => comment.isConnected,
        evaluate: () => {
            const newValue = valueGetter();
            const hasDifferentTrackByValue = () => !!newValue.find((value, index) => watcher.value.oldValue[index][trackBy] !== value[trackBy]);
            if (
                (watcher.value.oldValue.length !== newValue.length)
                || (trackBy && hasDifferentTrackByValue())
            ) {
                watcher.value.newValue = newValue;
                watcher.hasChanges = true;
            } else {
                watcher.hasChanges = false;
            }
        },
        handlerChange: ({ oldValue, newValue }: any) => {
            const trackByKeyToIndexMap = new Map();
            const newElementsArray = new Array(newValue.length);

            // Build a map of trackBy keys to indices for the old array
            oldValue.forEach((item: any, index: number) => {
                const key = trackBy ? item[trackBy] : index;
                trackByKeyToIndexMap.set(key, index);
            });

             // Process the new array
            newValue.forEach((newItem: any, newIndex: number) => {
                const newKey = trackBy ? newItem[trackBy] : newIndex;
                const oldIndex = trackByKeyToIndexMap.get(newKey);

                if (oldIndex !== undefined) {
                    // Reuse the existing element
                    newElementsArray[newIndex] = elementsArray[oldIndex];
                    trackByKeyToIndexMap.delete(newKey);
                } else {
                    // Create a new element if it doesn't exist
                    const newElement = elementCreator(newIndex);
                    newElementsArray[newIndex] = newElement;

                    // Append the new element after the comment or the last element
                    const before = newElementsArray[newIndex - 1] || comment;
                    before.after(newElement);
                }
            });

            // Remove elements that are no longer in the new array
            trackByKeyToIndexMap.forEach((_, oldIndex) => {
                elementsArray[oldIndex].remove();
            });

            // Update the elements array
            elementsArray = newElementsArray;
            watcher.value.oldValue = newValue;
        }
    };

    fragment.appendChild(comment);

    if (instance.isConnected) {
        // if component instance is already connected,
        // we should evaluate the new watcher because the change detection after component is connected will not run again
        evaluateWatcher(watcher, true);
    }

    instance.addForConditionWatcher(watcher);

    return fragment;
}