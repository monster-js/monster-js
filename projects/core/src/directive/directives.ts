import { FunctionComponent } from "../component/interfaces/function-component.interface";
import { Directive } from "./types/directive.type";

export const directives = (fnComponent: FunctionComponent, ...dirs: Directive[]) => {
    if (!fnComponent.config.directives) fnComponent.config.directives = {};

    dirs.forEach(dir => {
        if (!fnComponent.config.directives[dir.namespace]) fnComponent.config.directives[dir.namespace] = [];
        fnComponent.config.directives[dir.namespace].push(dir);
    });
}
