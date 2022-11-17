import { component } from "./component";
import { FunctionComponent } from "./interfaces/function-component.interface";

export const shadowComponent = (fnComponent: FunctionComponent, selector: string, styles?: any, shadowMode: ShadowRootMode = 'closed') => {
    component(fnComponent, selector, styles);
    fnComponent.config.shadowMode = shadowMode;
}
