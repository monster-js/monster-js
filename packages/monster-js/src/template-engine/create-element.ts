import { setAttribute } from "./set-attribute";

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

// ✅ Predefined Set of SVG Elements for Fast Lookup
const SVG_ELEMENTS = new Set([
    "svg", "g", "defs", "symbol", "use", "title", "desc", "switch",
    "rect", "circle", "ellipse", "line", "polyline", "polygon", "path",
    "text", "tspan", "textPath",
    "linearGradient", "radialGradient", "pattern", "clipPath", "mask",
    "filter", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite",
    "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight",
    "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur",
    "feImage", "feMerge", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting",
    "feSpotLight", "feTile", "feTurbulence", "animate", "animateTransform",
    "animateMotion", "set", "image", "marker", "view", "script", "foreignObject"
]);

export function createElement(elementName: string, attributes: Record<any, any> = null) {

    const isSVG = SVG_ELEMENTS.has(elementName);
    let element: HTMLElement | SVGElement;

    if (isSVG) {
        element = document.createElementNS(SVG_NAMESPACE, elementName);
    } else if (attributes?.is) {
        element = document.createElement(elementName, { is: attributes.is });
    } else {
        element = document.createElement(elementName);
    }

    if (attributes) {
        Object.keys(attributes).forEach(key => {
            setAttribute(element, key, attributes[key]);
        });
    }

    return element;
}
