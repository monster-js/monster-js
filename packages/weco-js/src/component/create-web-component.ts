import { ComponentConfigInterface } from "../interfaces/component-config.interface";
import { FnComponentInterface } from "../interfaces/fn-component.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";

export function createWebComponent(renderFunction: () => Element, parentClass = HTMLElement): any {
    return class extends parentClass implements WebComponentInterface {

        private watchers: WatcherInterface[] = [];
        private conditionWatchers: WatcherInterface[] = [];
        private element: Element;

        private connectedCallbacks: (() => void)[] = [];
        private afterViewInits: (() => void)[] = [];
        private disconnectedCallbacks: (() => void)[] = [];
        private attributeChangedCallbacks: ((attrName: any, oldVal: any, newVal: any) => void)[] = [];
        private adoptedCallbacks: (() => void)[] = [];

        private directives: Record<string, any> = {};

        constructor() {
            super();

            const fnComponent: FnComponentInterface = renderFunction as any;
            (fnComponent.__meta?.directives || []).forEach((directiveFn) => {
                this.directives[directiveFn.namespace] = directiveFn;
            });

            if (typeof renderFunction === 'function') {
                this.element = renderFunction.bind(this)();
            }
        }

        public getDirective(namespace: string) {
            return this.directives[namespace];
        }

        public addHook(type: 'connected' | 'disconnected' | 'attributeChanged' | 'adopted' | 'afterViewInit', callback: (...args: any[]) => void) {
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

        static get observedAttributes() {
            return ((renderFunction as any)?.config as ComponentConfigInterface)?.observedAttributes || [];
        }

        public connectedCallback() {
            if (this.element) {
                this.appendChild(this.element);
            }
            this.connectedCallbacks.forEach((callback) => callback());
            this.detectChanges();
            this.afterViewInits.forEach((callback) => callback());
        }

        public disconnectedCallback() {
            this.disconnectedCallbacks.forEach((callback) => callback());
        }

        public attributeChangedCallback(attrName: string, oldVal: string, newVal: string) {
            this.attributeChangedCallbacks.forEach((callback) => callback(attrName, oldVal, newVal));
        }

        public adoptedCallback() {
            this.adoptedCallbacks.forEach((callback) => callback());
        }

        private evaluateWatcher(watcher: WatcherInterface) {
            if (!watcher.getIsConnected()) return;
            watcher.evaluate();
            if (watcher.hasChanges) {
                watcher.handlerChange(watcher.value);
            }
        }

        public detectChanges() {
            this.conditionWatchers.forEach(watcher => this.evaluateWatcher(watcher));
            this.watchers.forEach(watcher => this.evaluateWatcher(watcher));
            this.conditionWatchers = this.conditionWatchers.filter(watcher => watcher.getIsConnected());
            this.watchers = this.watchers.filter(watcher => watcher.getIsConnected());
        }

        public addConditionWatcher(watcher: WatcherInterface) {
            this.conditionWatchers.push(watcher);
        }

        public addWatcher(watcher: WatcherInterface) {
            this.watchers.push(watcher);
        }
    }
}
