import { ComponentInstance } from "../core";

export const output = <T>(context: ComponentInstance, key: keyof T, callback: (...args: any[]) => void) => {
    (context.__wrapper as any)[key] = callback;
}
