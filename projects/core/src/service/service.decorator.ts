import { ServiceClass } from "./interfaces/service-class.interface";
import { ServiceConfig } from "./interfaces/service-config.interface";

export function Service(config?: ServiceConfig) {
    return function(target: ServiceClass) {
        target.singleton = !!config?.singleton;
    }
}
