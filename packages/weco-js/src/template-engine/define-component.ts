import { ComponentConfigInterface } from "../interfaces/component-config.interface";
import { WatcherInterface } from "../interfaces/watcher.interface";
import { WebComponentInterface } from "../interfaces/web-component.interface";
import { PROPS_SYMBOL } from "../utils/props-symbol";

export function defineComponent(selector: string, renderFunction: () => Element, parentClass = HTMLElement) {
    class WebComponent extends parentClass implements WebComponentInterface {

        private watchers: WatcherInterface[] = [];
        private conditionWatchers: WatcherInterface[] = [];
        private element: Element;
        private connectedCallbacks: (() => void)[] = [];
        private disconnectedCallbacks: (() => void)[] = [];
        private attributeChangedCallbacks: ((attrName: any, oldVal: any, newVal: any) => void)[] = [];
        private adoptedCallbacks: (() => void)[] = [];
        private privateProps: Record<any, any> = {};

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
