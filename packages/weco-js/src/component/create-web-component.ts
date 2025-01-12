import { LifecycleHooksEnum } from "../enums/lifecycle-hooks.enum";
import { FnComponentInterface } from "../interfaces/fn-component.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { defineStyles, removeDefinedStyles } from "../utils/define-styles";

export function createWebComponent(renderFunction: () => Element): any {
    const fnComponent: FnComponentInterface = renderFunction as any;
    let parentClass = HTMLElement;
    if (fnComponent.__meta.extends) {
        parentClass = fnComponent.__meta.extends[0];
    }

    return class extends parentClass implements WebComponentInterface {

        private watchers: WatcherInterface[] = [];
        private conditionWatchers: WatcherInterface[] = [];
        private element: Element;

        private hooks: Record<LifecycleHooksEnum, ((...args: any[]) => void)[]> = {} as any;

        private directives: Record<string, any> = {};

        private triggerAfterConnected: ((...args: any[]) => any)[] = [];

        private elementHolder: Element | ShadowRoot = this;

        constructor() {
            super();

            (fnComponent.__meta?.directives || []).forEach((directiveFn) => {
                this.directives[directiveFn.namespace] = directiveFn;
            });

            if (typeof renderFunction === 'function') {
                this.element = renderFunction.bind(this)();
            }

            this.setElementHolder();
        }

        private setElementHolder() {
            if (this.isShadowDom()) {
                this.elementHolder = this.attachShadow({ mode: fnComponent.__meta.shadowMode });
            }
        }

        public addTriggerAfterConnected(callback: (...args: any[]) => any) {
            this.triggerAfterConnected.push(callback);
        }

        public removeTriggerAfterConnected(callback: (...args: any[]) => any) {
            this.triggerAfterConnected = this.triggerAfterConnected.filter((item) => item === callback);
        }

        public getDirective(namespace: string) {
            return this.directives[namespace];
        }

        public addHook(type: LifecycleHooksEnum, callback: (...args: any[]) => void) {
            if (!this.hooks[type]) this.hooks[type] = [];
            this.hooks[type].push(callback);
        }

        private triggerHooks(type: LifecycleHooksEnum, args: any[] = []) {
            const hooks = this.hooks[type] || [];
            hooks.forEach((callback) => callback(...args));
        }

        static get observedAttributes() {
            return ((renderFunction as any) as FnComponentInterface)?.__meta?.observedAttributes || [];
        }

        private applyStyling() {
            if (fnComponent.__styleMeta && this.isShadowDom()) {
                const styles = document.createElement('style');
                styles.textContent = fnComponent.__styleMeta;
                this.elementHolder.appendChild(styles);
            } else if (fnComponent.__styleMeta) {
                defineStyles([fnComponent.__styleMeta]);
            }
        }

        private removeStyling() {
            if (fnComponent.__styleMeta && !this.isShadowDom()) {
                removeDefinedStyles([fnComponent.__styleMeta]);
            }
        }

        private isShadowDom() {
            const shadowMode = fnComponent.__meta.shadowMode;
            return ['open', 'closed'].includes(shadowMode);
        }

        private appendElement() {
            this.elementHolder.appendChild(this.element);
        }

        public connectedCallback() {

            this.applyStyling();

            this.appendElement();

            this.triggerHooks(LifecycleHooksEnum.connected);
            this.triggerAfterConnected.forEach((callback) => callback());
            this.detectChanges();
            this.triggerHooks(LifecycleHooksEnum.afterViewInit);
        }

        public disconnectedCallback() {
            this.removeStyling();
            this.triggerHooks(LifecycleHooksEnum.disconnected);
        }

        public attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
            this.triggerHooks(LifecycleHooksEnum.attributeChanged, [attrName, oldVal, newVal]);
        }

        public adoptedCallback() {
            this.triggerHooks(LifecycleHooksEnum.adopted);
        }

        private evaluateWatcher(watcher: WatcherInterface): boolean {
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
            this.conditionWatchers.forEach(watcher => {
                if (this.evaluateWatcher(watcher)) hasViewChange = true;
            });
            this.watchers.forEach(watcher => {
                if (this.evaluateWatcher(watcher)) hasViewChange = true;
            });

            if (!this.isConnected) return;

            this.conditionWatchers = this.conditionWatchers.filter(watcher => watcher.getIsConnected());
            this.watchers = this.watchers.filter(watcher => watcher.getIsConnected());
            if (hasViewChange) this.triggerHooks(LifecycleHooksEnum.afterViewChanged);
        }

        public addConditionWatcher(watcher: WatcherInterface) {
            this.conditionWatchers.push(watcher);
        }

        public addWatcher(watcher: WatcherInterface) {
            this.watchers.push(watcher);
        }
    }
}
