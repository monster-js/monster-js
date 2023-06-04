import { BaseProps } from "@monster-js/core";

export interface RouteProps extends BaseProps {
    path: string;
    element: () => any;
    exact?: boolean;
    redirectTo?: string;
    'redirect-to'?: string;
    guards?: any[];
}