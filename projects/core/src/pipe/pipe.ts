import { Pipe } from "./types/pipe.type";

export function pipe(target: Pipe, selector: string) {
    target.selector = selector;
}
