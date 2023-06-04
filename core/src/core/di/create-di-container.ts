import { DiContainer } from "./di-container";
import { ProviderClass } from "./interfaces/provider-class.interface";

export const createDIContainer = (name: string, targets: ProviderClass<any>[] = []) => {
    return new DiContainer(name, targets);
}
