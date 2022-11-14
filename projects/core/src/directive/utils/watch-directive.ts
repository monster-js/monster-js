import { watch } from "../../watcher/watch";
import { DirectiveArg } from "../interfaces/directive-arg.interface";

export const watchDirective = (arg: DirectiveArg, callback: (newValue?: any) => void) => watch(() => arg.directive.get(), arg.element, arg.component, callback);
