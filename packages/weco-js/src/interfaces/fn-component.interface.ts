export interface FnComponentInterface {
    __meta: {
        selector: string;
        parentClass?: CustomElementConstructor;
        directives?: ({ namespace: string } & any)[];
    }
}
