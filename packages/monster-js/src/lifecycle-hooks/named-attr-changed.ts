import { attributeChanged } from "./attribute-changed";

export function namedAttrChanged<T = any>(
    classComponent: any,
    attrName: string,
    callback: (newValue: T, oldValue: T) => void,
    transformers: ((value: any) => any)[] = []
) {
    let firstRun = true;
    attributeChanged(classComponent, (originalAttrName, oldVal, newVal) => {
        if (originalAttrName === attrName) {
            let transformedOldValue: any = oldVal;
            let transformedNewValue: any = newVal;

            transformers.forEach((transformer) => {
                if (!firstRun) transformedOldValue = transformer(transformedOldValue);
                transformedNewValue = transformer(transformedNewValue);
            });

            if (transformedOldValue !== transformedNewValue) {
                callback(transformedNewValue, transformedOldValue);
            }

            firstRun = false;
        }
    });
}
