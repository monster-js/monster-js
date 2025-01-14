import { createEventEmitter } from "./create-event-emitter";
export function createFeatureEventEmitter(name) {
    const eventEmitter = createEventEmitter();
    return {
        on: (callback) => eventEmitter.on(name, callback),
        emit: (value) => eventEmitter.emit(name, value),
        off: (callback) => eventEmitter.off(name, callback),
        clear: () => eventEmitter.clear(name)
    };
}
//# sourceMappingURL=create-feature-event-emitter.js.map