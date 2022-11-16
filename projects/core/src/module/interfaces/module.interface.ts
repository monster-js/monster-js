import { FunctionComponent } from "../../component/interfaces/function-component.interface";
import { ProviderClass } from "../../dependency-injection/interfaces/provider-class.interface";
import { Provider } from "../../dependency-injection/interfaces/provider.interface";
import { Directive } from "../../directive/types/directive.type";
import { Pipe } from "../../pipe/types/pipe.type";

export interface Module {
    root?: FunctionComponent;
    pipes?: Pipe[];
    modules?: Module[];
    providers?: (ProviderClass | Provider)[];
    components?: FunctionComponent[];
    directives?: Directive[];
    exports?: {
        pipes?: Pipe[];
        providers?: (ProviderClass | Provider)[];
        directives?: Directive[];
        components?: FunctionComponent[];
    }
}
