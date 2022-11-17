export interface RenderReturnInterface {
    queryAll(query: string): NodeListOf<HTMLElement>;
    query<T = HTMLElement>(query: string): T;
    host: HTMLElement;
    element: HTMLElement;
    detectChanges: () => any;
    shadowRoot: ShadowRoot;
}
