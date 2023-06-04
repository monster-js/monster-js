import { UseStateReturn } from "./types/use-state-return.type";
import { FunctionComponent } from "../component/interfaces/function-component.interface";

export const useState = <T = any>(context: FunctionComponent, initialValue?: T): UseStateReturn<T> => {
    let value: T = initialValue!;
    const setter = (newValue: T) => {
        let hasChanges = value !== newValue;
        value = newValue;
        if (hasChanges) context.__wrapper.detectChanges();
    }
    return [() => value, setter];
}
