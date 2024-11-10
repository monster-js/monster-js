export function createEventEmitter<T extends Record<string, any>>() {

    const events = new Map<keyof T, Function[]>();

    return {
        /**
         * Registers a listener for the specified event.
         * @param {string} eventName - The name of the event to listen for.
         * @param {Function} listener - The callback function for the event.
         */
        on<K extends keyof T>(eventName: K, listener: (data: T[K]) => void) {
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
        emit<K extends keyof T>(eventName: K, data: T[K]) {
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
        off<K extends keyof T>(eventName: K, listener: (data: T[K]) => void) {
            const listeners = events.get(eventName);
            if (listeners) {
                events.set(eventName, listeners.filter(l => l !== listener));
            }
        },

        /**
         * Clears all listeners for a specific event or all events if no event name is provided.
         * @param {string} [eventName] - Optional event name to clear listeners for.
         */
        clear<K extends keyof T>(eventName: K) {
            if (eventName) {
                events.delete(eventName);
            } else {
                events.clear();
            }
        }
    };
}
