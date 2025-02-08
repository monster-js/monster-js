export function ifCondition(classComponent, elementCreator, valueGetter) {
    const instance = classComponent;
    const comment = document.createComment(' if ');
    const fragment = document.createDocumentFragment();
    let element;
    const changeDetection = {
        hasChanges: false,
        value: undefined,
        getIsConnected: () => comment.isConnected,
        evaluate() {
            const newValue = valueGetter();
            if (changeDetection.value !== newValue) {
                changeDetection.value = newValue;
                changeDetection.hasChanges = true;
            }
            else {
                changeDetection.hasChanges = false;
            }
        },
        handlerChange(value) {
            if (value) {
                element = elementCreator();
                comment.after(element);
            }
            else if (element) {
                element.remove();
                element = null;
            }
        }
    };
    fragment.appendChild(comment);
    instance.addConditionWatcher(changeDetection);
    return fragment;
}
//# sourceMappingURL=if-condition.js.map