import { WebComponentInterface } from "../interfaces/web-component.interface";

export function createSharedState<T>(initValue: T) {

    type CreateStateReturnType<T> = [() => T, (value: T) => void];

    let components: WebComponentInterface[] = [];
    let value: T = Object.freeze(initValue);

    return function (componentInstance: any): CreateStateReturnType<T> {
        const getter = () => value;
        const setter = (newValue: T) => {
            if (value !== newValue) {
                value = Object.freeze(newValue);

                let newComponents: WebComponentInterface[] = [];
                components.forEach((component) => {
                    if (component.isConnected) {
                        component.detectChanges();
                        newComponents.push(component);
                    }
                });

                components = newComponents;
            }
        }

        if (!components.includes(componentInstance)) {
            components.push(componentInstance);
        }

        return [getter, setter];
    };
}

