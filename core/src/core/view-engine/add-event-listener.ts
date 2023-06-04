export const addEventListener = (
    element: HTMLElement,
    event: keyof HTMLElementEventMap,
    handler: (event?: Event) => void,
    preventDefault?: boolean
) => {
    element.addEventListener(event, event => {
        if (preventDefault) event.preventDefault();
        handler(event);
    });
    return element;
}
