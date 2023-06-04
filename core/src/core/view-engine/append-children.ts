export const appendChildren = (parent: HTMLElement, children: (HTMLElement | Text)[]) => {
    children.forEach(child => parent.appendChild(child));
    return parent;
}