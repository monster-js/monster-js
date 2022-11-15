import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { ComponentWrapper } from "../component/interfaces/component-wrapper.interface";
import { ViewDirective } from "./interfaces/view-directive.interface";

export function viewDir(context: ComponentInstance, element: HTMLElement, directives: ViewDirective[]) {
    const component: ComponentWrapper = context.__wrapper;

    directives.forEach(directive => {
        const selectedDirectives = component.directives[directive.namespace];
        if (!component.directives[directive.namespace]) return console.error(`Directive '${directive.namespace}' is not registered in ${component.dataSource.name}`);

        selectedDirectives.forEach(dir => dir({
            element,
            directives: directive.directives,
            component: context
        }));
    });

    return element;
}
