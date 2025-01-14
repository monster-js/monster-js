import { DependencyConfigInterface } from "../interfaces/dependency-config.interface";
import { ConstructableType } from "../types/constructable.type";
export declare function createDIContainer(initConfig?: DependencyConfigInterface[]): [<T>(key: ConstructableType<T> | T) => T, (newConfig: DependencyConfigInterface[]) => void];
