import { DirectiveGetterSetter, FunctionComponent, createWatcher } from '@monster-js/core';

export const watchDirective = (arg: {
    directive: DirectiveGetterSetter,
    element: HTMLElement,
    context: FunctionComponent
}, callback: (newValue?: any) => void) => createWatcher(() => arg.directive.get(), arg.element, arg.context, callback);
