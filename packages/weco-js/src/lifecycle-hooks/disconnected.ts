import { WebComponentInterface } from "../interfaces/web-component.interface";

export function disconnected(classComponent: any, callback: (...args: any[]) => void) {
    (classComponent as WebComponentInterface).addHook('disconnected', callback);
}
