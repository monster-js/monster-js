export function addPreventEventListener(element: Element, events: Record<string, (event?: Event, element?: Element) => void>) {
    Object.keys(events).forEach(key => {
        element.addEventListener(key, (event) => {
            event.preventDefault();
            events[key](event, element);
        });
    });
    return element;
}
