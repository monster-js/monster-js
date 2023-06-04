export function createLazyComponent(componentCaller: () => Promise<any>) {
    (componentCaller as any).isLazy = true;
    return componentCaller;
}