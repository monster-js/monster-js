import { WebComponentInterface } from "../interfaces/web-component.interface";
import { hyphenToCapital } from "../utils/hyphen-to-capital";
import { getProps } from "../utils/props-store";

export function createProp<T = unknown>(instance: WebComponentInterface, name: string): () => T {
    return () => getProps(instance)[hyphenToCapital(name)] as T;
}