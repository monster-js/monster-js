import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { attribute } from "./attribute";

export const attrNumber = (context: ComponentInstance, attributeName: string, changeWatcher?: (newValue: number, oldValue: number) => void) => {
    const valueCaller = attribute(
        context,
        attributeName,
        changeWatcher
            ? (newValue: any, oldValue: any) => changeWatcher(Number(newValue), Number(oldValue))
            : null
    );

    return () => Number(valueCaller());
}