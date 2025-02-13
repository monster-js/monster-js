export function setAttribute(
  element: Element,
  name: string,
  inputValue: unknown,
): Element {
  const localElement = element as unknown as Record<string, unknown>;
  const value = inputValue === undefined ? '' : inputValue;

  // Attributes that should be set as properties instead of attributes
  const propertyAttributes: string[] = [
    'value',
    'disabled',
    'checked',
    'selected',
    'innerHTML',
    'textContent',
  ];

  if (propertyAttributes.includes(name)) {
    // Use property assignment for known property-based attributes
    localElement[name] = value;
  } else if (typeof value === 'boolean') {
    // Handle boolean attributes like `readonly`, `hidden`, etc.
    if (value) {
      element.setAttribute(name, '');
    } else {
      element.removeAttribute(name);
    }
  } else if (value == null) {
    // Remove the attribute if the value is null or undefined,
    // The == is required instead of === to so null or undefined value will be true
    element.removeAttribute(name);
  } else {
    // Default case: set the attribute normally
    element.setAttribute(name, value.toString());
  }

  return element;
}
