import { WebComponentInterface } from "../interfaces/web-component.interface";

export function createProp(instance: WebComponentInterface, name: string) {
    return () => instance.props[name];
}
