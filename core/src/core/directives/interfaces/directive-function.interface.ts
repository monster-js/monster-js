import { FunctionComponent } from "../../../public_apis";
import { DirectiveObject } from "./directive-object.interface";

type DirectiveFn = (element: HTMLElement, directives: DirectiveObject, context: FunctionComponent) => HTMLElement;

export interface DirectiveFunction extends DirectiveFn {
    namespace?: string;
}