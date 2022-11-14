import { ComponentInstance } from "../component/interfaces/component-instance.interface";
import { ComponentWrapper } from "../component/interfaces/component-wrapper.interface";

export function viewPipe(context: ComponentInstance, pipeSelector: string, value: any, params: any[] = []) {
    const component: ComponentWrapper = context.__wrapper;
    const pipe = component.pipes[pipeSelector];
    if (pipe) return pipe(value, params);
    console.error(`The pipe ${pipeSelector} is not registered in ${component.dataSource.name}.`);
}
