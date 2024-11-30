import { WebComponentInterface } from "../interfaces/web-component.interface";
import { getProps } from "../utils/props-store";

export function createProp(instance: WebComponentInterface, name: string) {
    return () => getProps(instance)[name];
}
