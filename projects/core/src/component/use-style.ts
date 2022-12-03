import { FunctionComponent } from "./interfaces/function-component.interface";

export const useStyle = (fnComponent: FunctionComponent, styles?: any) => {
    fnComponent.config = {
        styles
    };
}
