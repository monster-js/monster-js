import { Module } from "@monster-js/core/module";
import { route } from "./route.component";
import { routerDirective } from "./router.directive";
import { RouterService } from "./router.service";

export const RouterModule: Module = {
    exports: {
        directives: [routerDirective],
        services: [RouterService],
        components: [route]
    }
};