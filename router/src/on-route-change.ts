import { FunctionComponent } from "@monster-js/core";

export function onRouteChange(context: FunctionComponent, callback: () => void) {
    (context.__wrapper as any).routerOnRouteChangeHooks.push(callback);
}