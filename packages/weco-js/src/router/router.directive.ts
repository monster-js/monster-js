import { inject } from "../di/default-di-container";
import { directive } from "../directives/directive";
import { addEventListener } from "../template-engine/add-event-listener";
import { bindAttributes } from "../template-engine/bind-attributes";
import { DirectiveDataType } from "../types/directive-data.type";
import { RouterService } from "./router.service";

export function routerDirective(element: Element, data: DirectiveDataType) {

    const routerService = inject(RouterService);

    if (element.tagName === 'A') {
        bindAttributes(this, element, { href: data.link });
    }

    const clickEvent = (event: Event) => {
        event.preventDefault();
        routerService.navigate(data.link());
    };

    addEventListener(element, { click: clickEvent });

    return element;
}

directive(routerDirective, 'router');
