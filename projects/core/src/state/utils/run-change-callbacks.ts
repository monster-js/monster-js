import { ChangeCallback } from "../interfaces/change-callbacks.interface";

export const runChangeCallbacks = (callbacks: ChangeCallback[], value: any): ChangeCallback[] => {
    callbacks = callbacks.filter(item => item.isConnected());
    callbacks.forEach(item => item.callback(value));
    return callbacks;
}