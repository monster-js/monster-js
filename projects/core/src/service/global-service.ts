import { GlobalDataSource } from "../dependency-injection/global-data-source";
import { ServiceClass } from "./interfaces/service-class.interface";

export const globalService = (service: ServiceClass, config?: any) => {
    (globalThis.GlobalDataSource as GlobalDataSource).data.set(service, {
        singleton: service.singleton,
        config
    });
}
