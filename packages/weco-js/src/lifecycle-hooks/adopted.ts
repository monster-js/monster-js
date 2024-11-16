import { WebComponentInterface } from "../interfaces/web-component.interface";

export function adopted(classComponent: any, callback: (...args: any[]) => void) {
    (classComponent as WebComponentInterface).addHook('adopted', callback);
}
