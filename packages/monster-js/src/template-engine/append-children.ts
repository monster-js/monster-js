export function appendChildren(parent: Element, children: (Element | Text)[]) {
    children.forEach((child) => {
        parent.appendChild(child);
    });
    return parent;
}