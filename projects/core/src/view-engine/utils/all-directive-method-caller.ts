import { ComponentInstance } from "../../component/interfaces/component-instance.interface";
import { AllDirectivesArg } from "../../directive/interfaces/all-directive-arg.interface";
import { ViewDirective } from "../interfaces/view-directive.interface";

export function allDirectiveMethodCaller(
    directive: ViewDirective["directives"],
    instance: any,
    context: ComponentInstance,
    element: HTMLElement
) {
    const param: AllDirectivesArg = {
        element,
        directives: directive,
        component: context
    };
    const method = 'allDirectives';
    if (instance[method] && typeof instance[method] === 'function') instance[method](param);
}