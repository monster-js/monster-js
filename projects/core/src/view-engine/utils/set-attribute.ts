export const setAttribute = (element: HTMLElement, key: string, value: any) => (key === 'value')
    ? (element as HTMLInputElement).value = value
    : element.setAttribute(key, value);