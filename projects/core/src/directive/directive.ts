import { Directive } from "./types/directive.type";

export const directive = (target: Directive, namespace: string) => target.namespace = namespace;
