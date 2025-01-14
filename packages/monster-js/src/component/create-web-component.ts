import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
import { FnComponentInterface } from "../interfaces/fn-component.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { defineStyles } from "../utils/define-styles";
import { removeDefinedStyles } from "../utils/remove-defined-styles";

export function createWebComponent(renderFunction: () => Element): any {
    const fnComponent: FnComponentInterface = renderFunction as any;
    let parentClass = HTMLElement;
    if (fnComponent.__meta.extends) {
        parentClass = fnComponent.__meta.extends[0];
    }

    return class extends parentClass implements WebComponentInterface {

        private _watchers: WatcherInterface[] = [];
        private _conditionWatchers: WatcherInterface[] = [];
        private _element: Element;

        private _hooks: Record<LifecycleHooksEnum, ((...args: any[]) => void)[]> = {} as any;

        private _directives: Record<string, any> = {};

        private _triggerAfterConnected: ((...args: any[]) => any)[] = [];

        private _elementHolder: Element | ShadowRoot = this;

        constructor() {
            super();

            (fnComponent.__meta?.directives || []).forEach((directiveFn) => {
                this._directives[directiveFn.namespace] = directiveFn;
            });

            if (typeof renderFunction === 'function') {
                this._element = renderFunction.bind(this)();
            }

            this._setElementHolder();
        }

        private _setElementHolder() {
            if (this._isShadowDom()) {
                this._elementHolder = this.attachShadow({ mode: fnComponent.__meta.shadowMode });
            }
        }

        public addTriggerAfterConnected(callback: (...args: any[]) => any) {
            this._triggerAfterConnected.push(callback);
        }

        public removeTriggerAfterConnected(callback: (...args: any[]) => any) {
            this._triggerAfterConnected = this._triggerAfterConnected.filter((item) => item === callback);
        }

        public getDirective(namespace: string) {
            return this._directives[namespace];
        }

        public addHook(type: LifecycleHooksEnum, callback: (...args: any[]) => void) {
            if (!this._hooks[type]) this._hooks[type] = [];
            this._hooks[type].push(callback);
        }

        private _triggerHooks(type: LifecycleHooksEnum, args: any[] = []) {
            const hooks = this._hooks[type] || [];
            hooks.forEach((callback) => callback(...args));
        }

        static get observedAttributes() {
            return ((renderFunction as any) as FnComponentInterface)?.__meta?.observedAttributes || [];
        }

        private _applyStyling() {
            if (fnComponent.__styleMeta && this._isShadowDom()) {
                const styles = document.createElement('style');
                styles.textContent = fnComponent.__styleMeta;
                this._elementHolder.appendChild(styles);
            } else if (fnComponent.__styleMeta) {
                defineStyles([fnComponent.__styleMeta]);
            }
        }

        private _removeStyling() {
            if (fnComponent.__styleMeta && !this._isShadowDom()) {
                removeDefinedStyles([fnComponent.__styleMeta]);
            }
        }

        private _isShadowDom() {
            const shadowMode = fnComponent.__meta.shadowMode;
            return ['open', 'closed'].includes(shadowMode);
        }

        private _appendElement() {
            this._elementHolder.appendChild(this._element);
        }

        public connectedCallback() {

            this._applyStyling();

            this._appendElement();

            this._triggerHooks(LifecycleHooksEnum.connected);
            this._triggerAfterConnected.forEach((callback) => callback());
            this.detectChanges();
            this._triggerHooks(LifecycleHooksEnum.afterViewInit);
        }

        public disconnectedCallback() {
            this._removeStyling();
            this._triggerHooks(LifecycleHooksEnum.disconnected);
        }

        public attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
            this._triggerHooks(LifecycleHooksEnum.attributeChanged, [attrName, oldVal, newVal]);
        }

        public adoptedCallback() {
            this._triggerHooks(LifecycleHooksEnum.adopted);
        }

        private _evaluateWatcher(watcher: WatcherInterface): boolean {
            if (!watcher.getIsConnected()) return false;
            watcher.evaluate();
            if (watcher.hasChanges) {
                watcher.handlerChange(watcher.value);
                return true;
            }
            return false;
        }

        public detectChanges() {
            let hasViewChange = false;
            this._conditionWatchers.forEach(watcher => {
                if (this._evaluateWatcher(watcher)) hasViewChange = true;
            });
            this._watchers.forEach(watcher => {
                if (this._evaluateWatcher(watcher)) hasViewChange = true;
            });

            if (!this.isConnected) return;

            this._conditionWatchers = this._conditionWatchers.filter(watcher => watcher.getIsConnected());
            this._watchers = this._watchers.filter(watcher => watcher.getIsConnected());
            if (hasViewChange) this._triggerHooks(LifecycleHooksEnum.afterViewChanged);
        }

        public addConditionWatcher(watcher: WatcherInterface) {
            this._conditionWatchers.push(watcher);
        }

        public addWatcher(watcher: WatcherInterface) {
            this._watchers.push(watcher);
        }
    }
}
