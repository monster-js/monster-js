import { WebComponentInterface } from "../interfaces/web-component.interface";
import { hyphenToCapital } from "../utils/hyphen-to-capital";
import { getProps } from "../utils/props-store";

export function createProp(instance: WebComponentInterface, name: string) {
    return () => getProps(instance)[hyphenToCapital(name)];
}