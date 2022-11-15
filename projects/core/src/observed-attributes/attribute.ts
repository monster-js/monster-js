import { ComponentInstance } from "../component/interfaces/component-instance.interface";

export const attribute = (context: ComponentInstance, attributeName: string, changeWatcher?: (newValue: any, oldValue: any) => void) => {
    const { __wrapper } = context;
    if (!__wrapper.observedAttrWatchers[attributeName]) __wrapper.observedAttrWatchers[attributeName] = { value: null, watchers: [] };
    if (changeWatcher) __wrapper.observedAttrWatchers[attributeName].watchers.push(changeWatcher);
    return () => __wrapper.observedAttrWatchers[attributeName].value;
}
