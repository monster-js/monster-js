import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
export function afterViewChanged(classComponent, callback) {
    classComponent.addHook(LifecycleHooksEnum.afterViewChanged, callback);
}
//# sourceMappingURL=after-view-changed.js.map