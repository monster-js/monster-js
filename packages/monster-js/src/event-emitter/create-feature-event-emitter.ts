import { createEventEmitter } from "./create-event-emitter";

export function createFeatureEventEmitter<T = any>(name: string) {
    const eventEmitter = createEventEmitter();
    return {
        on: (callback: (value: T) => void) => eventEmitter.on(name, callback),
        emit: (value: T) => eventEmitter.emit(name, value),
        off: (callback: (value: T) => void) => eventEmitter.off(name, callback),
        clear: () => eventEmitter.clear(name)
    };
}
