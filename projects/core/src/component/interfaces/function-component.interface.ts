import { DataSource } from "../../dependency-injection/interfaces/data-source.interface";
import { ComponentWrapper } from "./component-wrapper.interface";
import { DefinedComponents } from "./defined-components.interface";

type FnComponentType = (props?: { [key: string]: any; }) => any;

export interface FunctionComponent extends FnComponentType {
    isMonster?: boolean;
    config?: {
        shadowMode?: ShadowRootMode;
        styles?: any;
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