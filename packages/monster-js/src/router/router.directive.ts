import { inject } from "../di/default-di-container";
import { directive } from "../directives/directive";
import { addEventListener } from "../template-engine/add-event-listener";
import { bindAttributes } from "../template-engine/bind-attributes";
import { DirectiveDataType } from "../types/directive-data.type";
import { removeStartAndEndSlashes } from "../utils/remove-start-and-end-slashes";
import { evaluateRoute } from "./evaluate-route";
import { routerChange } from "./router-change";
import { routerNavigate } from "./router-navigate";

function _routerDirective(element: Element, data: DirectiveDataType, originalElement: Element) {

    const navigate = inject(routerNavigate);

    if (originalElement.tagName === 'A') {
        bindAttributes(this, originalElement, { href: data.link });
    }

    if (data.linkActive) {
        routerChange(this, () => {
            const url = removeStartAndEndSlashes(location.pathname + location.search);
            const linkActiveClass = data.linkActive();
            const classList = originalElement.classList;
            if (evaluateRoute(data.link(), url, data.linkActiveMatch ? data.linkActiveMatch() as any : 'prefix')) {
                if (!classList.contains(linkActiveClass)) {
                    classList.add(linkActiveClass);
                }
            } else {
                if (classList.contains(linkActiveClass)) {
                    classList.remove(linkActiveClass);
                }
            }
        });
    }

    const clickEvent = (event: Event) => {
        event.preventDefault();
        navigate(data.link());
    };

    addEventListener(element, { click: clickEvent });

    return element;
}

export const routerDirective = directive(_routerDirective, 'router');
