export function isClass(obj) {
    if (typeof obj !== 'function')
        return false;
    const descriptor = Object.getOwnPropertyDescriptor(obj, 'prototype');
    if (!descriptor)
        return false;
    return !descriptor.writable;
}
//# sourceMappingURL=is-class.js.map