export function addEventListener(element, events) {
    Object.keys(events).forEach(key => {
        element.addEventListener(key, (event) => events[key](event, element));
    });
    return element;
}
//# sourceMappingURL=add-event-listener.js.map