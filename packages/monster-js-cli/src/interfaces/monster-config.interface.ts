export interface MonsterConfigInterface {
    appRoot: string;
    component: {
        selectorPrefix: string;
        shadowMode: 'open' | 'closed' | null;
    };
    environmentsPath: string;
    standaloneDir: string;
    assets: string;
}
