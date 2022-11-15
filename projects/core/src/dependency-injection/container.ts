import { DataSourceData } from "./interfaces/data-source-data.interface";
import { DataSource } from "./interfaces/data-source.interface";

export class Container {

    private dataSource: DataSource;

    constructor(dataSource: DataSource) {
        this.dataSource = dataSource;
    }

    public getSource<T>(target: T): DataSourceData {
        return this.dataSource.data.get(target);
    }

    public update(target: new (...args: any[]) => any, data: DataSourceData) {
        this.dataSource.data.set(target, data);
    }

    public register(target: new (...args: any[]) => any, data: DataSourceData) {


        /**
         * If condition is to prevent overriding single data
         */
        if (data.singleton)
            if (!this.getSource(target)) this.dataSource.data.set(target, data);
        else
            this.dataSource.data.set(target, data);


    }


    /**
     * Get data from dataSource,
     * throw error if data is not found
     */
    private getSourceData(target: any) {
        let sourceData: DataSourceData = this.dataSource.data.get(target);
        if (!sourceData) {

            const globalSource = globalThis.GlobalDataSource;
            if (globalSource === this.dataSource) throw new Error(`${target.name} is not registered in global dependency injection container.`);

            const di = new Container(globalSource);
            sourceData = di.getSource(target);

            if (!sourceData) throw new Error(`${target.name} is not registered in ${this.dataSource.name} and in global dependency injection container.`);
        }
        return sourceData;
    }


    private triggerHooks(instance: any, sourceData: DataSourceData, parent?: any) {
        /**
         * instance will receive the custom parent if there is a custom parent
         * and the instance has onReceiveParent hook
         */
        instance.onReceiveParent && typeof instance.onReceiveParent === 'function' && parent && instance.onReceiveParent(parent);


        /**
         * Set instance config if there is a config data
         */
        sourceData.config && instance.onReceiveConfig && typeof instance.onReceiveConfig === 'function' && instance.onReceiveConfig(sourceData.config.config, this);
    }

    public resolve<T = any>(target: new (...args: any[]) => T, parent?: any): T {

        const sourceData = this.getSourceData(target);


        /**
         * If singleton and has already an instance return the instance
         */
        if (sourceData.singleton && sourceData.instance) return sourceData.instance;


        const params: any[] = Reflect.getMetadata('design:paramtypes', target) || [];
        const paramsInstances: any[] = params.map(item => this.resolve(item));
        const instance = new target(...paramsInstances);


        /**
         * injected dependency will receive the parent instance
         */
        paramsInstances.forEach(item => item.onReceiveParent && typeof item.onReceiveParent === 'function' && item.onReceiveParent(instance));


        this.triggerHooks(instance, sourceData, parent);
        this.setupSingleton(instance, target, sourceData);

        return instance;
    }

    /**
     * If singleton update instance in the data source
     */
    private setupSingleton<T>(instance: any, target: new (...args: any[]) => T, sourceData: DataSourceData) {
        if (sourceData.singleton) {
            sourceData.instance = instance;
            this.update(target, {
                ...sourceData,
                instance: instance
            });
        }
    }
}
