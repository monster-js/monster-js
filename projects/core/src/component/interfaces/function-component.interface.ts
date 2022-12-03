import { DataSource } from "../../dependency-injection/interfaces/data-source.interface";
import { ComponentWrapper } from "./component-wrapper.interface";
import { DefinedComponents } from "./defined-components.interface";
import { Style } from "./style.interface";

type FnComponentType = (props?: { [key: string]: any; }) => any;

export interface FunctionComponent extends FnComponentType {
    isMonster?: boolean;
    config?: {
        shadowMode?: ShadowRootMode;
        styles?: Style;
        selector?: string;
        superClass?: CustomElementConstructor;
        extendsElement?: string;
        definedComponents?: DefinedComponents;
        fakeDefinedComponents?: DefinedComponents;
        dataSource?: DataSource;
        directives?: ComponentWrapper['directives'];
        pipes?: ComponentWrapper['pipes'];
        observedAttributes?: string[];
    }
}