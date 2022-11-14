export const addEvent = (
    element: HTMLElement,
    name: string,
    handler: (event?: Event) => any,
    preventDefault?: boolean
) => {
    /**
     * TODO : change event to accept function instead of function call expression
     */
    element.addEventListener(name, event => {
        if (preventDefault) event.preventDefault();
        handler(event);
    });
    return element;
}