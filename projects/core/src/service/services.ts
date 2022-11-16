import { FunctionComponent } from "../component/interfaces/function-component.interface";
import { ServiceClass } from "./interfaces/service-class.interface";

export const services = (fnComponent: FunctionComponent, ...services: (ServiceClass | [service: ServiceClass, config: any])[]) => {
    services.forEach(service => {
        let target: ServiceClass;
        let config = null;
        if (Array.isArray(service)) [target, config] = service;
        else target = service;

        fnComponent.config.dataSource.data.set(target, {
            config,
            singleton: target.singleton
        });
    });
}
