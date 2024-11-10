import { WebComponentInterface } from "../interfaces/web-component.interface";

export function createProps(instance: WebComponentInterface) {
    return () => instance.props;
}
