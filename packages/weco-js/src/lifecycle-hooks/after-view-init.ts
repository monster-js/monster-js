import { WebComponentInterface } from "../interfaces/web-component.interface";

export function afterViewInit(classComponent: any, callback: (...args: any[]) => void) {
    (classComponent as WebComponentInterface).addHook('afterViewInit', callback);
}

