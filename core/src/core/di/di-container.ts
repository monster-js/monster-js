import { DISourceData } from "./interfaces/di-source-data.interface";
import { ProviderClass } from "./interfaces/provider-class.interface";

type Source = Omit<Omit<DISourceData, 'singleton'>, 'instance'>;

export class DiContainer {

    private name: string;
    private dataSource: Map<any, DISourceData> = new Map();

    constructor(name: string, targets: ProviderClass<any>[]) {
        this.name = name;
        this.registerMultiple(targets);
        this.inject = this.inject.bind(this);
    }

    private registerMultiple(targets: ProviderClass<any>[]) {
        targets.forEach(target => {
            this.register(target);
        });
    }

    private register(target: ProviderClass<any>, source: Source = {}) {
        const singleton: boolean = !!(target as any).singleton;
        this.dataSource.set(target, {
            ...source,
            singleton
        });
    }

    private getSourceData(target: any) {
        let sourceData: DISourceData | undefined = this.dataSource.get(target);
        // global data source will be resolve in here
        return sourceData;
    }

    public useValue(target: ProviderClass<any>, value: any) {
        const dataSource = this.dataSource.get(target)
        if (dataSource) {
            dataSource.useValue = value;
            this.update(target, dataSource);
        }
    }

    public useClass(target: ProviderClass<any>, providedClass: ProviderClass<any>) {
        const dataSource = this.dataSource.get(target)
        if (dataSource) {
            dataSource.useClass = providedClass;
            this.update(target, dataSource);
        }
    }

    public inject<T = any>(target: ProviderClass<T>): T {

        const sourceData = this.getSourceData(target);

        if (!sourceData) throw new Error(`${target.name} is not registered in ${this.name}`);

        target = sourceData.useClass || target;

        /**
         * If singleton and has already an instance return the instance
         */
        if (sourceData.singleton && sourceData.instance) return sourceData.instance;

        let instance = sourceData.useValue;

        if (!sourceData.useValue) {
            const params: any[] = Reflect.getMetadata('design:paramtypes', target) || [];
            const paramsInstances: any[] = params.map(item => this.inject(item));
            instance = new target(...paramsInstances);
        }

        this.setupSingleton(instance, target, sourceData);

        return instance;
    }

    private update(target: ProviderClass<any>, data: DISourceData) {
        this.dataSource.set(target, data);
    }

    /**
     * If singleton update instance in the data source
     */
    private setupSingleton<T>(instance: any, target: ProviderClass<T>, sourceData: DISourceData) {
        if (sourceData.singleton) {
            sourceData.instance = instance;
            this.update(target, {
                ...sourceData,
                instance: instance
            });
        }
    }
}
