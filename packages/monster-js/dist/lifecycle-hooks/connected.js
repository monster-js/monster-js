import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
export function connected(classComponent, callback) {
    classComponent.addHook(LifecycleHooksEnum.connected, callback);
}
//# sourceMappingURL=connected.js.map