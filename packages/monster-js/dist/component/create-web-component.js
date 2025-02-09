import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
import { defineStyles } from "../utils/define-styles";
import { evaluateWatcher } from "../utils/evaluate-watcher";
import { removeDefinedStyles } from "../utils/remove-defined-styles";
export function createWebComponent(renderFunction) {
    const fnComponent = renderFunction;
    let parentClass = HTMLElement;
    if (fnComponent.__meta.extends) {
        parentClass = fnComponent.__meta.extends[0];
    }
    return class extends parentClass {
        constructor() {
            super();
            this._watchers = [];
            this._forConditionWatchers = [];
            this._ifConditionWatchers = [];
            this._hooks = {};
            this._directives = {};
            this._triggerAfterConnectedInternalCallbacks = [];
            this._elementHolder = this;
            (fnComponent.__meta?.directives || []).forEach((directiveFn) => {
                this._directives[directiveFn.namespace] = directiveFn;
            });
            if (typeof renderFunction === 'function') {
                this._element = renderFunction.bind(this)();
            }
            this._setElementHolder();
        }
        _setElementHolder() {
            if (this._isShadowDom()) {
                this._elementHolder = this.attachShadow({ mode: fnComponent.__meta.shadowMode });
            }
        }
        addTriggerAfterConnected(callback) {
            this._triggerAfterConnectedInternalCallbacks.push(callback);
        }
        removeTriggerAfterConnected(callback) {
            this._triggerAfterConnectedInternalCallbacks = this._triggerAfterConnectedInternalCallbacks.filter((item) => item === callback);
        }
        getDirective(namespace) {
            return this._directives[namespace];
        }
        addHook(type, callback) {
            if (!this._hooks[type])
                this._hooks[type] = [];
            this._hooks[type].push(callback);
        }
        _triggerHooks(type, args = []) {
            const hooks = this._hooks[type] || [];
            hooks.forEach((callback) => callback(...args));
        }
        static get observedAttributes() {
            return renderFunction?.__meta?.observedAttributes || [];
        }
        _applyStyling() {
            if (fnComponent.__styleMeta && this._isShadowDom()) {
                const styles = document.createElement('style');
                styles.textContent = fnComponent.__styleMeta;
                this._elementHolder.appendChild(styles);
            }
            else if (fnComponent.__styleMeta) {
                defineStyles([fnComponent.__styleMeta]);
            }
        }
        _removeStyling() {
            if (fnComponent.__styleMeta && !this._isShadowDom()) {
                removeDefinedStyles([fnComponent.__styleMeta]);
            }
        }
        _isShadowDom() {
            const shadowMode = fnComponent.__meta.shadowMode;
            return ['open', 'closed'].includes(shadowMode);
        }
        _appendElement() {
            this._elementHolder.appendChild(this._element);
        }
        connectedCallback() {
            this._applyStyling();
            this._appendElement();
            this._triggerHooks(LifecycleHooksEnum.connected);
            this._triggerAfterConnectedInternalCallbacks.forEach((callback) => callback());
            this.detectChanges();
            this._triggerHooks(LifecycleHooksEnum.afterViewInit);
        }
        disconnectedCallback() {
            this._removeStyling();
            this._triggerHooks(LifecycleHooksEnum.disconnected);
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            this._triggerHooks(LifecycleHooksEnum.attributeChanged, [attrName, oldVal, newVal]);
        }
        adoptedCallback() {
            this._triggerHooks(LifecycleHooksEnum.adopted);
        }
        detectChanges() {
            let hasViewChange = false;
            this._forConditionWatchers.forEach(watcher => {
                if (evaluateWatcher(watcher))
                    hasViewChange = true;
            });
            this._ifConditionWatchers.forEach(watcher => {
                if (evaluateWatcher(watcher))
                    hasViewChange = true;
            });
            this._watchers.forEach(watcher => {
                if (evaluateWatcher(watcher))
                    hasViewChange = true;
            });
            if (!this.isConnected)
                return;
            this._forConditionWatchers = this._forConditionWatchers.filter(watcher => watcher.getIsConnected());
            this._ifConditionWatchers = this._ifConditionWatchers.filter(watcher => watcher.getIsConnected());
            this._watchers = this._watchers.filter(watcher => watcher.getIsConnected());
            if (hasViewChange)
                this._triggerHooks(LifecycleHooksEnum.afterViewChanged);
        }
        addIfConditionWatcher(watcher) {
            this._ifConditionWatchers.push(watcher);
        }
        addForConditionWatcher(watcher) {
            this._forConditionWatchers.push(watcher);
        }
        addWatcher(watcher) {
            this._watchers.push(watcher);
        }
    };
}
//# sourceMappingURL=create-web-component.js.map