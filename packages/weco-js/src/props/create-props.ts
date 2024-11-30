import { WebComponentInterface } from "../interfaces/web-component.interface";
import { getProps } from "../utils/props-store";

export function createProps(instance: WebComponentInterface) {
    return () => getProps(instance);
}
