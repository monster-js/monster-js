interface NewProjectOptionsInterface {
    installPackages: boolean;
    shadowMode?: 'open' | 'closed';
}
export declare function newProject(projectName: string, options: NewProjectOptionsInterface): void;
export {};
