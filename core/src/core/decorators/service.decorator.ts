import { ProviderClass } from "../di/interfaces/provider-class.interface";
import { ServiceConfig } from "./interfaces/service-config.interface";

export function Service(config?: ServiceConfig) {
    return function(target: ProviderClass) {
        target.singleton = !!config?.singleton;
    }
}
