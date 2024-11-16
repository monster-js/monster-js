import { WebComponentInterface } from "../interfaces/web-component.interface";

export function attributeChanged(classComponent: any, callback: (...args: any[]) => void) {
    (classComponent as WebComponentInterface).addHook('attributeChanged', callback);
}
