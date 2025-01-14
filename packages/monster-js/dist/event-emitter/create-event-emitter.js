const events = new Map();
export function createEventEmitter() {
    return {
        /**
         * Registers a listener for the specified event.
         * @param {string} eventName - The name of the event to listen for.
         * @param {Function} listener - The callback function for the event.
         */
        on(eventName, listener) {
            if (!events.has(eventName)) {
                events.set(eventName, []);
            }
            events.get(eventName).push(listener);
        },
        /**
         * Emits an event, calling all registered listeners with the provided data.
         * @param {string} eventName - The name of the event to emit.
         * @param {*} [data] - Optional data to pass to each listener.
         */
        emit(eventName, data) {
            const listeners = events.get(eventName);
            if (listeners) {
                listeners.forEach(listener => listener(data));
            }
        },
        /**
         * Removes a specific listener for an event.
         * @param {string} eventName - The name of the event to stop listening for.
         * @param {Function} listener - The listener to remove.
         */
        off(eventName, listener) {
            const listeners = events.get(eventName);
            if (listeners) {
                events.set(eventName, listeners.filter(l => l !== listener));
            }
        },
        /**
         * Clears all listeners for a specific event or all events if no event name is provided.
         * @param {string} [eventName] - Optional event name to clear listeners for.
         */
        clear(eventName) {
            if (eventName) {
                events.delete(eventName);
            }
            else {
                events.clear();
            }
        }
    };
}
//# sourceMappingURL=create-event-emitter.js.map