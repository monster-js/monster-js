import { WebComponentInterface } from '../interfaces/web-component.interface';
import { PropValueType } from '../types/prop-value.type';

const propsStore = new WeakMap<WebComponentInterface, PropValueType>();

export function setProps(target: WebComponentInterface, value: PropValueType) {
  propsStore.set(target, value);
  if (target.isConnected) {
    target.detectChanges();
  }
}

export function getProps(target: WebComponentInterface): PropValueType {
  return propsStore.get(target);
}
