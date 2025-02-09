import { WebComponentInterface } from "../interfaces/web-component.interface";
export declare function createProp<T = unknown>(instance: WebComponentInterface, name: string): () => T;
