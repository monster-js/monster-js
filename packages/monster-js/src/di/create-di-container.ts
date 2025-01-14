import { DependencyConfigInterface } from "../interfaces/dependency-config.interface";
import { ConstructableType } from "../types/constructable.type";
import { isClass } from "../utils/is-class";

export function createDIContainer(initConfig: DependencyConfigInterface[] = []): [<T>(key: ConstructableType<T> | T) => T, (newConfig: DependencyConfigInterface[]) => void] {
    // Stores instances of singletons and config for dependency injection
    const instances = new Map();
    const configs: Map<any, DependencyConfigInterface> = new Map();
    const configOverride: Map<any, DependencyConfigInterface> = new Map();

    initConfig.forEach(config => {
        configs.set(config.provide, config);
    });

    function inject<T>(key: ConstructableType<T> | T): T {
        const config = configOverride.get(key) || configs.get(key);
        const isSingleton = (!config || (config && config.singleton === true));

        if (isSingleton) {
            if (instances.has(key)) {
                return instances.get(key);
            }
        }

        let instance;

        if (config && config.useValue) {
            instance = config.useValue;
        } else if (config && config.useClass) {
            instance = new config.useClass();
        } else {
            if (isClass(key)) {
                instance = new (key as ConstructableType<T>)();
            } else {
                instance = key;
            }
        }

        if (isSingleton) {
            instances.set(key, instance);
        }

        return instance;
    }

    function override(newConfig: DependencyConfigInterface[]) {
        configOverride.clear();
        newConfig.forEach((config) => {
            configOverride.set(config.provide, config);
        });
    }

    return [inject, override];
}
