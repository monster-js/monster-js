export const observedAttributes = (fnComponent: any, attributes: string[]) => {
    fnComponent.__observedAttrs = attributes;
}