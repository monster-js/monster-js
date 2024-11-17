import { ComponentConfigInterface } from "../interfaces/component-config.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { PROPS_SYMBOL } from "../utils/props-symbol";

export function defineComponent(selector: string, renderFunction: () => Element, parentClass = HTMLElement) {
    class WebComponent extends parentClass implements WebComponentInterface {

        private watchers: WatcherInterface[] = [];
        private conditionWatchers: WatcherInterface[] = [];
        private element: Element;
        private privateProps: Record<any, any> = {};

        private connectedCallbacks: (() => void)[] = [];
        private afterViewInits: (() => void)[] = [];
        private disconnectedCallbacks: (() => void)[] = [];
        private attributeChangedCallbacks: ((attrName: any, oldVal: any, newVal: any) => void)[] = [];
        private adoptedCallbacks: (() => void)[] = [];

        constructor() {
            super();

            (this as any)[PROPS_SYMBOL] = (props: Record<any, any>) => {
                this.privateProps = props;
                if (this.isConnected) {
                    this.detectChanges();
                }
            };

            if (typeof renderFunction === 'function') {
                this.element = renderFunction.bind(this)();
            }
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

        public get props() {
            return this.privateProps;
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
    customElements.define(selector, WebComponent);
}
