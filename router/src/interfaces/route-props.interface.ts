import { BaseProps } from "@monster-js/core";

export interface RouteProps extends BaseProps {
    path: string;
    element?: () => any;
    exact?: boolean;
    redirectTo?: string;
    'redirect-to'?: string;
    canActivate?: ((data?: any) => Promise<boolean> | boolean)[];
    canDeactivate?: ((data?: any) => Promise<boolean> | boolean)[];
    data?: any;
}