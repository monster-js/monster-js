export function bindModel(valueGetter: () => any, valueSetter: (value: any) => void, element: Element): Element {

    element.addEventListener('change', (event) => {
        console.log(event);
    });

    return element;
}
