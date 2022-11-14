import { component } from "./component";
import { FunctionComponent } from "./interfaces/function-component.interface";

export const shadowComponent = (fnComponent: FunctionComponent, selector: string, shadowMode: ShadowRootMode = 'closed', styles?: any) => {
    component(fnComponent, selector, styles);
    fnComponent.config.shadowMode = shadowMode;
}
