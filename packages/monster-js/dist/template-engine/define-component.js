import { PROPS_SYMBOL } from "../utils/props-symbol";
export function defineComponent(selector, renderFunction, parentClass = HTMLElement) {
    class WebComponent extends parentClass {
        constructor() {
            super();
            this.watchers = [];
            this.conditionWatchers = [];
            this.privateProps = {};
            this.connectedCallbacks = [];
            this.afterViewInits = [];
            this.disconnectedCallbacks = [];
            this.attributeChangedCallbacks = [];
            this.adoptedCallbacks = [];
            this[PROPS_SYMBOL] = (props) => {
                this.privateProps = props;
                if (this.isConnected) {
                    this.detectChanges();
                }
            };
            if (typeof renderFunction === 'function') {
                this.element = renderFunction.bind(this)();
            }
        }
        addHook(type, callback) {
            switch (type) {
                case 'connected':
                    this.connectedCallbacks.push(callback);
                    break;
                case 'afterViewInit':
                    this.afterViewInits.push(callback);
                    break;
                case 'disconnected':
                    this.disconnectedCallbacks.push(callback);
                    break;
                case 'attributeChanged':
                    this.attributeChangedCallbacks.push(callback);
                    break;
                case 'adopted':
                    this.adoptedCallbacks.push(callback);
                    break;
            }
        }
        get props() {
            return this.privateProps;
        }
        static get observedAttributes() {
            return renderFunction?.config?.observedAttributes || [];
        }
        connectedCallback() {
            if (this.element) {
                this.appendChild(this.element);
            }
            this.connectedCallbacks.forEach((callback) => callback());
            this.detectChanges();
            this.afterViewInits.forEach((callback) => callback());
        }
        disconnectedCallback() {
            this.disconnectedCallbacks.forEach((callback) => callback());
        }
        attributeChangedCallback(attrName, oldVal, newVal) {
            this.attributeChangedCallbacks.forEach((callback) => callback(attrName, oldVal, newVal));
        }
        adoptedCallback() {
            this.adoptedCallbacks.forEach((callback) => callback());
        }
        evaluateWatcher(watcher) {
            if (!watcher.getIsConnected())
                return;
            watcher.evaluate();
            if (watcher.hasChanges) {
                watcher.handlerChange(watcher.value);
            }
        }
        detectChanges() {
            this.conditionWatchers.forEach(watcher => this.evaluateWatcher(watcher));
            this.watchers.forEach(watcher => this.evaluateWatcher(watcher));
            this.conditionWatchers = this.conditionWatchers.filter(watcher => watcher.getIsConnected());
            this.watchers = this.watchers.filter(watcher => watcher.getIsConnected());
        }
        addConditionWatcher(watcher) {
            this.conditionWatchers.push(watcher);
        }
        addWatcher(watcher) {
            this.watchers.push(watcher);
        }
    }
    customElements.define(selector, WebComponent);
}
//# sourceMappingURL=define-component.js.map