export const appendChildren = (element: HTMLElement, children: (HTMLElement | Text)[]) => {
    element.append(...children);
    return element;
}