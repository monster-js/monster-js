export function setAttribute(element: Element, name: string, value: any): Element {
    // Attributes that should be set as properties instead of attributes
    const propertyAttributes = ['value', 'disabled', 'checked', 'selected', 'innerHTML', 'textContent'];
    
    if (propertyAttributes.includes(name)) {
        // Use property assignment for known property-based attributes
        (element as any)[name] = value;
    } else if (typeof value === 'boolean') {
        // Handle boolean attributes like `readonly`, `hidden`, etc.
        if (value) {
            element.setAttribute(name, '');
        } else {
            element.removeAttribute(name);
        }
    } else if (value === null || value === undefined) {
        // Remove the attribute if the value is null or undefined
        element.removeAttribute(name);
    } else {
        // Default case: set the attribute normally
        element.setAttribute(name, value.toString());
    }
    
    return element;
}