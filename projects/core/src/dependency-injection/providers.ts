import { FunctionComponent } from "../component/interfaces/function-component.interface";
import { ProviderClass } from "./interfaces/provider-class.interface";
import { Provider } from "./interfaces/provider.interface";

export const providers = (fnComponent: FunctionComponent, ...services: (ProviderClass | Provider<ProviderClass>)[]) => {
    services.forEach(service => {
        let target: ProviderClass;
        let useValue: any;
        let useClass: { new(...args: any[]): any; };

        if (typeof service === 'function') target = service;
        else if (typeof service === 'object') {
            target = service.provide;
            useValue = service.useValue;
            useClass = service.useClass;
        }

        fnComponent.config.dataSource.data.set(target, {
            singleton: target.singleton,
            useValue,
            useClass
        });
    });
}
