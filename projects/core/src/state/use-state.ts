import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { UseStateReturn } from "./types/use-state-return.type";

export function useState<T = any>(context: ComponentInstance, initialValue?: T): UseStateReturn<T> {
    let value: T = initialValue;
    const setter = (newValue: T) => {
        let hasChanges = value !== newValue;
        value = newValue;
        if (hasChanges) context.__wrapper.detectChanges();
    }
    return [() => value, setter];
}