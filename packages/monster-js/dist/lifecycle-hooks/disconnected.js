import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
export function disconnected(classComponent, callback) {
    classComponent.addHook(LifecycleHooksEnum.disconnected, callback);
}
//# sourceMappingURL=disconnected.js.map