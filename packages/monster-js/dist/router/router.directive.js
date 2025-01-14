import { inject } from "../di/default-di-container";
import { directive } from "../directives/directive";
import { addEventListener } from "../template-engine/add-event-listener";
import { bindAttributes } from "../template-engine/bind-attributes";
import { routerNavigate } from "./router-navigate";
function _routerDirective(element, data) {
    const navigate = inject(routerNavigate);
    if (element.tagName === 'A') {
        bindAttributes(this, element, { href: data.link });
    }
    const clickEvent = (event) => {
        event.preventDefault();
        navigate(data.link());
    };
    addEventListener(element, { click: clickEvent });
    return element;
}
export const routerDirective = directive(_routerDirective, 'router');
//# sourceMappingURL=router.directive.js.map