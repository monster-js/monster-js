import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
export function attributeChanged(classComponent, callback) {
    classComponent.addHook(LifecycleHooksEnum.attributeChanged, callback);
}
//# sourceMappingURL=attribute-changed.js.map