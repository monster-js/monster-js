import { DirectiveFunction } from "./interfaces/directive-function.interface";

export const createDirective = (dir: DirectiveFunction, namespace: string) => {
    dir.namespace = namespace;
};
