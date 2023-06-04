import { FunctionComponent } from "../../public_apis";
import { attribute } from "./attribute";

export const attrNumber = (context: FunctionComponent, attributeName: string, changeWatcher?: (newValue: number, oldValue: number) => void): () => number => {
    const valueCaller = attribute(
        context,
        attributeName,
        changeWatcher
            ? (newValue: any, oldValue: any) => changeWatcher(Number(newValue), Number(oldValue))
            : null!
    );

    return () => Number(valueCaller());
}