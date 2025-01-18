import { hyphenToCapital } from "../utils/hyphen-to-capital";
import { getProps } from "../utils/props-store";
export function createProp(instance, name) {
    return () => getProps(instance)[hyphenToCapital(name)];
}
//# sourceMappingURL=create-prop.js.map