import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
import { FnComponentInterface } from "../interfaces/fn-component.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { defineStyles } from "../utils/define-styles";
import { evaluateWatcher } from "../utils/evaluate-watcher";
import { removeDefinedStyles } from "../utils/remove-defined-styles";

export function createWebComponent(renderFunction: () => Element): any {
    const fnComponent: FnComponentInterface = renderFunction as any;
    let parentClass = HTMLElement;
    if (fnComponent.__meta.extends) {
        parentClass = fnComponent.__meta.extends[0];
    }

    return class extends parentClass implements WebComponentInterface {

        private _watchers: WatcherInterface[] = [];
        private _forConditionWatchers: WatcherInterface[] = [];
        private _ifConditionWatchers: WatcherInterface[] = [];
        private _element: Element;

        private _hooks: Record<LifecycleHooksEnum, ((...args: any[]) => void)[]> = {} as any;

        private _directives: Record<string, any> = {};

        private _triggerAfterConnectedInternalCallbacks: ((...args: any[]) => any)[] = [];

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
            this._triggerAfterConnectedInternalCallbacks.push(callback);
        }

        public removeTriggerAfterConnected(callback: (...args: any[]) => any) {
            this._triggerAfterConnectedInternalCallbacks = this._triggerAfterConnectedInternalCallbacks.filter((item) => item === callback);
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
            this._triggerAfterConnectedInternalCallbacks.forEach((callback) => callback());
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

        public detectChanges() {
            let hasViewChange = false;
            this._forConditionWatchers.forEach(watcher => {
                if (evaluateWatcher(watcher)) hasViewChange = true;
            });
            this._ifConditionWatchers.forEach(watcher => {
                if (evaluateWatcher(watcher)) hasViewChange = true;
            });
            this._watchers.forEach(watcher => {
                if (evaluateWatcher(watcher)) hasViewChange = true;
            });

            if (!this.isConnected) return;

            this._forConditionWatchers = this._forConditionWatchers.filter(watcher => watcher.getIsConnected());
            this._ifConditionWatchers = this._ifConditionWatchers.filter(watcher => watcher.getIsConnected());
            this._watchers = this._watchers.filter(watcher => watcher.getIsConnected());
            if (hasViewChange) this._triggerHooks(LifecycleHooksEnum.afterViewChanged);
        }

        public addIfConditionWatcher(watcher: WatcherInterface) {
            this._ifConditionWatchers.push(watcher);
        }

        public addForConditionWatcher(watcher: WatcherInterface) {
            this._forConditionWatchers.push(watcher);
        }

        public addWatcher(watcher: WatcherInterface) {
            this._watchers.push(watcher);
        }
    }
}
