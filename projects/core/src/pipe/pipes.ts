import { FunctionComponent } from "../component/interfaces/function-component.interface";
import { Pipe } from "./types/pipe.type";

export const pipes = (fnComponent: FunctionComponent, ...pipes: Pipe[]) => {
    if (!fnComponent.config.pipes) fnComponent.config.pipes = {};
    pipes.forEach(pip => fnComponent.config.pipes[pip.selector] = pip);
}
