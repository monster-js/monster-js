import { DataSourceData } from "./interfaces/data-source-data.interface";

export class GlobalDataSource {

    private static instance: GlobalDataSource;

    public data: Map<any, DataSourceData> = new Map();
    public name: string = this.constructor.name;

    constructor() {
        if (GlobalDataSource.instance) {
            return GlobalDataSource.instance;
        }
        GlobalDataSource.instance = this;
    }
}
