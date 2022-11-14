import { DataSourceData } from "./data-source-data.interface";

export interface DataSource {
    data: Map<any, DataSourceData>;
    name: string;
}