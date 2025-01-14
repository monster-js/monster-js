import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
export function adopted(classComponent, callback) {
    classComponent.addHook(LifecycleHooksEnum.adopted, callback);
}
//# sourceMappingURL=adopted.js.map