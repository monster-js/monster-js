import { FunctionComponent } from "../../component/interfaces/function-component.interface";
import { Directive } from "../../directive/types/directive.type";
import { Pipe } from "../../pipe/types/pipe.type";
import { ServiceClass } from "../../service/interfaces/service-class.interface";

export interface Module {
    root?: FunctionComponent;
    pipes?: Pipe[];
    modules?: Module[];
    services?: (ServiceClass | [ServiceClass, any])[];
    components?: FunctionComponent[];
    directives?: Directive[];
    exports?: {
        pipes?: Pipe[];
        services?: (ServiceClass | [ServiceClass, any])[];
        directives?: Directive[];
        components?: FunctionComponent[];
    }
}
