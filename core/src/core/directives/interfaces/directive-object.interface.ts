import { DirectiveGetterSetter } from "./directive-getter-setter.interface";

export interface DirectiveObject {
    [key: string]: DirectiveGetterSetter;
}