import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
import { WebComponentInterface } from "../interfaces/web-component.interface";

export function afterViewChanged(classComponent: any, callback: (...args: any[]) => void) {
    (classComponent as WebComponentInterface).addHook(LifecycleHooksEnum.afterViewChanged, callback);
}