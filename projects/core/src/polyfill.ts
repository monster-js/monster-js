import { createComponent } from "./component/create-component";
import { FunctionComponent } from "./component/interfaces/function-component.interface";
import { GlobalDataSource } from './dependency-injection/global-data-source';

declare const globalThis: any;
globalThis.GlobalDataSource = new GlobalDataSource();

const originalFn = customElements.define;
customElements.define = function() {
    const component: FunctionComponent = arguments[1];
    if (component.isMonster) arguments[1] = createComponent(component);
    originalFn.apply(this, arguments);
}
