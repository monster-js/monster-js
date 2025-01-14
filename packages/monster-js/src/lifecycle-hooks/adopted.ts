import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
import { WebComponentInterface } from "../interfaces/web-component.interface";

export function adopted(classComponent: any, callback: (...args: any[]) => void) {
    (classComponent as WebComponentInterface).addHook(LifecycleHooksEnum.adopted, callback);
}
