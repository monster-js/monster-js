import { DirectiveFunction } from "./interfaces/directive-function.interface";

export const registerDirectives = (component: any, directives: DirectiveFunction[]) => {
    component.directives = {};
    directives.forEach(item => {
        component.directives[(item as any).namespace] = item;
    });
};
