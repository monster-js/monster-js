import { AllDirectivesArg } from "../interfaces/all-directive-arg.interface";

type DirType = (args: AllDirectivesArg) => void;

export interface Dir extends DirType {
    namespace?: string;
}

export type Directive = Dir;