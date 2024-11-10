export function addEventListener(element: Element, events: Record<string, (event?: Event, element?: Element) => void>) {
    Object.keys(events).forEach(key => {
        element.addEventListener(key, (event) => events[key](event, element));
    });
    return element;
}
