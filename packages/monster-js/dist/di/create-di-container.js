import { isClass } from "../utils/is-class";
export function createDIContainer(initConfig = []) {
    // Stores instances of singletons and config for dependency injection
    const instances = new Map();
    const configs = new Map();
    const configOverride = new Map();
    initConfig.forEach(config => {
        configs.set(config.provide, config);
    });
    function inject(key) {
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
        }
        else if (config && config.useClass) {
            instance = new config.useClass();
        }
        else {
            if (isClass(key)) {
                instance = new key();
            }
            else {
                instance = key;
            }
        }
        if (isSingleton) {
            instances.set(key, instance);
        }
        return instance;
    }
    function override(newConfig) {
        configOverride.clear();
        newConfig.forEach((config) => {
            configOverride.set(config.provide, config);
        });
    }
    return [inject, override];
}
//# sourceMappingURL=create-di-container.js.map