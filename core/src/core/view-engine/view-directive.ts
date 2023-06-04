import { FunctionComponent } from "../component/interfaces/function-component.interface";
import { Component } from "../component/interfaces/component.interface";
import { ViewDirective } from "./interfaces/view-directive.interface";

export function viewDirective(context: FunctionComponent, element: HTMLElement, directives: ViewDirective[]) {
    const component: Component = context.__wrapper;

    directives.forEach(directive => {
        const selectedDirective = component.directives[directive.n];
        if (!selectedDirective) return console.error(`Directive '${directive.n}' is not registered in the component ${context.__wrapper.localName}`);

        selectedDirective(element, directive.d, context);
    });

    return element;
}
