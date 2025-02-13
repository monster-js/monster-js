import { WebComponentInterface } from "../interfaces/web-component.interface";

type CreateStateReturnType<T> = [() => T, (value: T) => void];

function isBuiltInObject(obj: any) {
    return obj instanceof Array || obj instanceof Date || obj instanceof Function || obj instanceof RegExp;
}

function canBeFrozen(obj: any) {
    if (Object.isFrozen(obj)) {
        return false;  // Already frozen
    }

    if (Object.isSealed(obj)) {
        return false;  // Already sealed
    }

    const descriptors = Object.getOwnPropertyDescriptors(obj);
    if (Object.values(descriptors).some(desc => !desc.configurable)) {
        return false;  // Has non-configurable properties
    }

    if (isBuiltInObject(obj)) {
        return false;  // Built-in object (e.g., Array, Date)
    }

    return true;  // Can be frozen
}

export function createState<T>(classComponent: any, initValue: T): CreateStateReturnType<T> {
    const instance: WebComponentInterface = classComponent;
    const freeze = (value: any) => canBeFrozen(value) ? Object.freeze(value) : value;
    let value: T = freeze(initValue);
    const getter = () => value;
    const setter = (newValue: T) => {
        if (value !== newValue) {
            value = freeze(newValue);
            instance.detectChanges();
        }
    }
    return [getter, setter];
}
