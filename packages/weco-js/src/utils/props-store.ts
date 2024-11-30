import { WebComponentInterface } from "../interfaces/web-component.interface";

const propsStore = new WeakMap();

export function setProps(target: WebComponentInterface, value: any) {
    propsStore.set(target, value);
    if (target.isConnected) target.detectChanges();
}

export function getProps(target: WebComponentInterface) {
    return propsStore.get(target);
}