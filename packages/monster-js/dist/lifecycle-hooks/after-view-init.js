import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
export function afterViewInit(classComponent, callback) {
    classComponent.addHook(LifecycleHooksEnum.afterViewInit, callback);
}
//# sourceMappingURL=after-view-init.js.map