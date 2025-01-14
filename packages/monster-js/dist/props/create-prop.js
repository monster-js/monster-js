import { getProps } from "../utils/props-store";
export function createProp(instance, name) {
    return () => getProps(instance)[name];
}
//# sourceMappingURL=create-prop.js.map