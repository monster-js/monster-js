import { Pipe } from "./types/pipe.type";

export function pipe(target: Pipe, namespace: string) {
    target.namespace = namespace;
}
