import { DirectiveArg } from "./directive-arg.interface";

export interface AllDirectivesArg extends Omit<DirectiveArg, "directive"> {
    directives: { [key: string]: { get: () => any, set?: (val?: any) => void; } };
}
