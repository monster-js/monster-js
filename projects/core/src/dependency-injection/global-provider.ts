import { GlobalDataSource } from "./global-data-source";
import { Provider } from "./interfaces/provider.interface";
import { ProviderClass } from "./interfaces/provider-class.interface";

export const globalProvider = (provide: ProviderClass | Provider<ProviderClass>) => {

    let target: ProviderClass;
    let useValue: any;
    let useClass: { new(...args: any[]): any; };

    if (typeof provide === 'function') target = provide;
    else if (typeof provide === 'object') {
        target = provide.provide;
        useValue = provide.useValue;
        useClass = provide.useClass;
    }

    (globalThis.GlobalDataSource as GlobalDataSource).data.set(target, {
        singleton: target.singleton,
        useValue,
        useClass
    });
}
