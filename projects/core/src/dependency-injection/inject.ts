import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { Container } from "./container";

export const inject = <T>(context: ComponentInstance, target: { new(...args: any[]): T }): T => {
    const di = new Container(context.__wrapper.dataSource);
    return di.resolve(target as any);
}
