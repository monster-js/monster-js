import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
import { WebComponentInterface } from "../interfaces/web-component.interface";

export function connected(classComponent: any, callback: (...args: any[]) => void) {
    (classComponent as WebComponentInterface).addHook(LifecycleHooksEnum.connected, callback);
}
