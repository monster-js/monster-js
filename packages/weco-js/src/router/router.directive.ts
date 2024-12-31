import { directive } from "../directives/directive";
import { addEventListener } from "../template-engine/add-event-listener";
import { bindAttributes } from "../template-engine/bind-attributes";
import { DirectiveDataType } from "../types/directive-data.type";
import { navigate } from "./navigate";

export function routerDirective(element: Element, data: DirectiveDataType) {
    if (element.tagName === 'A') {
        bindAttributes(this, element, { href: data.link });
    }
    const clickEvent = (event: Event) => {
        event.preventDefault();
        navigate(data.link());
    };
    addEventListener(element, { click: clickEvent });
    return element;
}

directive(routerDirective, 'router');
