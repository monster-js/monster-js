import { FunctionComponent } from "../../public_apis";
import { attribute } from "./attribute";

export const attrBoolean = (context: FunctionComponent, attributeName: string, changeWatcher?: (newValue: boolean, oldValue: boolean) => void): () => boolean => {
    const falsy = [null, undefined, 'null', 'undefined', '', '0', 'false'];
    const value = attribute(
        context,
        attributeName,
        changeWatcher
            ? (newValue: any, oldValue: any) => changeWatcher(!falsy.includes(newValue), !falsy.includes(oldValue))
            : null!
    );

    return () => !falsy.includes(value());
}
