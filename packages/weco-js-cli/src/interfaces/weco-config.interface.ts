export interface WecoConfigInterface {
    appRoot: string;
    component: {
        selectorPrefix: string;
        shadowMode: 'open' | 'closed' | null;
    };
    environmentsPath: string;
    standaloneDir: string;
}
