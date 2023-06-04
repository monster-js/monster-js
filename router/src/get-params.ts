import { FunctionComponent } from "@monster-js/core";

export function getParams<T = any>(context: FunctionComponent): T {
    return (context.__wrapper as any).routerParams;
}