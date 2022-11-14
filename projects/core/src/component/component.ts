import { FunctionComponent } from "./interfaces/function-component.interface";

export const component = (fnComponent: FunctionComponent, selector: string, styles?: any) => {
    fnComponent.isMonster = true;
    fnComponent.config = {
        selector: selector,
        dataSource: {
            name: fnComponent.name,
            data: new Map()
        },
        definedComponents: {
            name: fnComponent.name,
            components: {}
        },
        styles
    };
}
