export interface FnComponentInterface {
    __styleMeta?: any;
    __meta: {
        selector: string;
        shadowMode?: 'open' | 'closed';
        extends?: [CustomElementConstructor, string];
        directives?: ({ namespace: string } & any)[];
        observedAttributes?: string[];
    }
}
