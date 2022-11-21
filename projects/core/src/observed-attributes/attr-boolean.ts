import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { attribute } from "./attribute";

export const attrBoolean = (context: ComponentInstance, attributeName: string, changeWatcher?: (newValue: any, oldValue: any) => void) => {
    const falsy = [null, undefined, 'null', 'undefined', '', '0', 'false'];
    const value = attribute(
        context,
        attributeName,
        changeWatcher
            ? (newValue: any, oldValue: any) => changeWatcher(!falsy.includes(newValue), !falsy.includes(oldValue))
            : null
    );

    return () => !falsy.includes(value());
}
