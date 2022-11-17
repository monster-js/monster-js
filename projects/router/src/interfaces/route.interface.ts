import { FunctionComponent } from "@monster-js/core";
import { Module } from "@monster-js/core/module";

export interface Route {
    path: string;
    component?: FunctionComponent;
    exact?: boolean;
    redirectTo?: string;
    module?: () => Promise<Module>;
    guards?: any[];
}