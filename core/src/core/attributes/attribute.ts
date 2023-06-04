import { FunctionComponent } from "../../public_apis";

export const attribute = (context: FunctionComponent, attributeName: string, changeWatcher?: (newValue: string, oldValue: string) => void): () => string => {
    const modifyWatcher = (customNewValue: any, customOldValue: any) => {
        if (customNewValue !== customOldValue && changeWatcher) {
            changeWatcher(customNewValue, customOldValue);
        }
    }
    const { __wrapper } = context;
    if (!__wrapper.observedAttrWatchers[attributeName]) __wrapper.observedAttrWatchers[attributeName] = { value: null, watchers: [] };
    if (changeWatcher) __wrapper.observedAttrWatchers[attributeName].watchers.push(modifyWatcher);
    return () => __wrapper.observedAttrWatchers[attributeName].value;
}
