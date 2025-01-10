export interface FnComponentInterface {
    __styleMeta?: string;
    __meta: {
        shadowDom?: boolean;
        selector: string;
        parentClass?: CustomElementConstructor;
        directives?: ({ namespace: string } & any)[];
        observedAttributes?: string[];
    }
}
