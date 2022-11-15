import { DataSource } from "../../dependency-injection/interfaces/data-source.interface";
import { Module } from "./module.interface";

export interface ExtendedModule extends Module {
    defined?: number;
    definedComponents?: { components: { [key: string]: boolean; } };
    dataSource?: DataSource;
    childrenExports?: Module['exports'];
}
