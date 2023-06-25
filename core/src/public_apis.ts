export { addEventListener as θa } from './core/view-engine/add-event-listener';
export { appendChildren as θb } from './core/view-engine/append-children';
export { createElement as θc } from './core/view-engine/create-element';
export { createTextNode as θd } from './core/view-engine/create-text-node';
export { renderChildComponent as θe } from './core/view-engine/render-child-component';
export { textBinding as θf } from './core/view-engine/text-binding';
export { setAttributes as θg } from './core/view-engine/set-attributes';
export { attributeBinding as θh } from './core/view-engine/attribute-binding';
export { viewProps as θi } from './core/view-engine/view-props';
export { viewDirective as θj } from './core/view-engine/view-directive';
export { ifCondition as θk } from './core/view-engine/if-condition';
export { listRendering as θl } from './core/view-engine/list-rendering';

export { createComponent } from './core/component/create-component';
export { createLazyComponent } from './core/component/create-lazy-component';
export { detectChanges } from './core/component/detect-changes';
export { BaseProps } from './core/component/interfaces/base-props.interface';
export { Component } from './core/component/interfaces/component.interface';
export { FunctionComponent } from './core/component/interfaces/function-component.interface';
export { component } from './core/component/component';
export { shadowComponent } from './core/component/shadow-component';
export { customElement } from './core/component/custom-element';
export { output, callOutputFn } from './core/component/output';
export { setComponentSelector } from './core/component/set-component-selector';
export { defineComponent } from './core/component/define-component';

export { useState } from './core/state/use-state';
export { createSharedState } from './core/state/create-shared-state';
export { createStoreState } from './core/state/create-store-state';
export { UseStateReturn } from './core/state/types/use-state-return.type';

export { createEventEmitter } from './core/events/create-event-emitter';

export { createDIContainer } from './core/di/create-di-container';

export { Service } from './core/decorators/service.decorator';

export { registerDirectives } from './core/directives/register-directives';
export { createDirective } from './core/directives/create-directive';
export { viewDirectives } from './core/directives/view-directives';
export { DirectiveObject } from './core/directives/interfaces/directive-object.interface';
export { DirectiveGetterSetter } from './core/directives/interfaces/directive-getter-setter.interface';

export { createWatcher } from './core/watcher/create-watcher';

export { adopted } from './core/hook/adopted';
export { afterInit } from './core/hook/after-init';
export { attributeChanged } from './core/hook/attribute-changed';
export { onChangeDetection } from './core/hook/on-change-detection';
export { onDestroy } from './core/hook/on-destroy';
export { onInit } from './core/hook/on-init';
export { onPropsChange } from './core/hook/on-props-change';
export { onViewChange } from './core/hook/on-view-change';
export { useEffect } from './core/hook/use-effect';

export { Subject } from './core/utils/subject';
export { Subscription } from './core/utils/interfaces/subscription.interface';
export { globalStyle } from './core/utils/global-style';

export { observedAttributes } from './core/attributes/observed-attributes';
export { attribute } from './core/attributes/attribute';
export { attrBoolean } from './core/attributes/attr-boolean';
export { attrNumber } from './core/attributes/attr-number';

/**
 * possible issues
 * - on adopt callback might append the elements multiple times
 * 
 * improvements
 * - Middleware
 *      - if observed attributes have a callback function, then the returned value of the callback function will be the value of the getter
 *      - useState and shared states can have a middleware that modifies the value before it is returned to the getter
 *          - ex const [count, setCount] = middleware(useState(this, 0), function(count) { return count + 100; })
 */