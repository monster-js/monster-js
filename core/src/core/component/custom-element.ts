export function customElement(fnComponent: any, customElementConstructor: CustomElementConstructor, elementLocalName: string) {
    fnComponent.__localName = elementLocalName;
    fnComponent.__superClass = customElementConstructor;
}