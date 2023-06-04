import { component } from "./component";
import { Style } from "./interfaces/style.interface";

export function shadowComponent(fnComponent: any, shadowMode: ShadowRootMode = 'open', styles?: Style) {
    fnComponent.__shadowMode = shadowMode;
    if (styles) component(fnComponent, styles);
}
