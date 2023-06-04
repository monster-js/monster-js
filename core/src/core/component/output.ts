export const output = <T>(context: any, key: keyof T, callback: (...args: any[]) => any) => {
    if (!context.__wrapper.output) context.__wrapper.output = {};
    context.__wrapper.output[key] = callback;
}

export const callOutputFn = <T = any, O = any>(component: HTMLElement, name: keyof T, args: any[] = []): O => {
    return (component as any).output[name](...args);
}