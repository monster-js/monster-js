import { attributeChanged } from "./attribute-changed";
export function namedAttrChanged(classComponent, attrName, callback, transformers = []) {
    let firstRun = true;
    attributeChanged(classComponent, (originalAttrName, oldVal, newVal) => {
        if (originalAttrName === attrName) {
            let transformedOldValue = oldVal;
            let transformedNewValue = newVal;
            transformers.forEach((transformer) => {
                if (!firstRun)
                    transformedOldValue = transformer(transformedOldValue);
                transformedNewValue = transformer(transformedNewValue);
            });
            if (transformedOldValue !== transformedNewValue) {
                callback(transformedNewValue, transformedOldValue);
            }
            firstRun = false;
        }
    });
}
//# sourceMappingURL=named-attr-changed.js.map