import { WebComponentInterface } from "../interfaces/web-component.interface";

type CreateStateReturnType<T> = [() => T, (value: T) => void];

export function createState<T>(classComponent: any, initValue: T): CreateStateReturnType<T> {
    const instance: WebComponentInterface = classComponent;
    let value: T = Object.freeze(initValue);
    const getter = () => value;
    const setter = (newValue: T) => {
        if (value !== newValue) {
            value = Object.freeze(newValue);
            instance.detectChanges();
        }
    }
    return [getter, setter];
}
