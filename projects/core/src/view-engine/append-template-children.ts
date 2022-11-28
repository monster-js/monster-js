export const appendTemplateChildren = (element: HTMLTemplateElement, children: (HTMLElement | Text)[]) => {
    element.content.append(...children);
    return element;
}
