import { ObservedAttributeWatcher } from "../attributes/interfaces/observed-attribute-watcher.interface";
import { Hooks } from "../hook/enums/hooks.enum";
import { Hook } from "../hook/interfaces/hook.interface";
import { deepClone } from "../utils/deep-clone";
import { Watcher } from "../watcher/interfaces/watcher.interface";
import { GlobalStyle } from "./global-style";
import { Component } from "./interfaces/component.interface";
import { Style } from "./interfaces/style.interface";

declare const globalThis: {
    globalStyle: GlobalStyle;
};
globalThis.globalStyle = new GlobalStyle();

export function createComponent(fnComponent: (props?: any) => HTMLElement, superClass: CustomElementConstructor = HTMLElement) {
    if ((fnComponent as any).__superClass) {
        superClass = (fnComponent as any).__superClass;
    }
    return class extends superClass implements Component {

        public watchers: Watcher[] = [];
        public cWatchers: Watcher[] = [];
        public directives: { [key: string]: () => HTMLElement; } = (fnComponent as any).directives || {};
        public hooks: { [k in Hooks]: Hook[] } = {
            onInit: [],
            onDestroy: [],
            afterInit: [],
            onChangeDetection: [],
            onViewChange: [],
            adopted: [],
            attributeChanged: [],
            onPropsChange: []
        };

        public props: { [key: string]: any; } = {};
        public debounce: any;
        public removeStyles: (() => void)[] = [];
        public root: HTMLElement | ShadowRoot = null!;

        public setProps(props: { [key: string]: any; }) {
            this.props = props;
            this.hooksCaller(Hooks.onPropsChange);
            this.detectChanges();
        }

        public detectChanges() {
            // this condition will prevent from removing the watchers since all elements are not connected yet.
            if (!this.isConnected || this.debounce) return;
            let hasChanges = false;

            this.debounce = setTimeout(() => {
                this.hooksCaller(Hooks.onChangeDetection);

                [...this.cWatchers, ...this.watchers].forEach(watcher => {
                    if (watcher.isConnected() && watcher.isUpdated()) {
                        hasChanges = true;
                        watcher.update(watcher.val);
                    }
                });

                this.watchers = this.watchers.filter(watcher => watcher.isConnected());
                this.cWatchers = this.cWatchers.filter(watcher => watcher.isConnected());

                if (hasChanges) {
                    this.hooksCaller(Hooks.onViewChange);
                }
                this.debounce = null;
            });
        }


        /**
         * @param key used to mark if pure component style is already defined
         */
        useStyle(style: Style, isShadowComponent: boolean): void {
            if (!style) return;

            if (isShadowComponent) {
                const element = document.createElement('style');

                element.innerHTML = style.styles;
                this.root.appendChild(element);
            } else {
                globalThis.globalStyle.add(style, style.styles);
                this.removeStyles.push(() => globalThis.globalStyle.remove(style));
            }
        }

        public buildComponent(component: any) {
            const element = component.bind({ __wrapper: this })(this.props)
            this.hooksCaller(Hooks.onInit);
            this.appendElement(element, component);
            this.hooksCaller(Hooks.afterInit);
        }

        public appendElement(element: HTMLElement, component: any) {
            this.root = this;
            const { __shadowMode } = component;
            if (__shadowMode) {
                this.root = this.attachShadow({ mode: __shadowMode });
            }
            this.useStyle((component as any).__styles, !!__shadowMode);
            this.root.appendChild(element);
        }

        connectedCallback() {
            if ((fnComponent as any).isLazy)
                (fnComponent() as any).then((lazyComponent: any) => {
                    this.directives = lazyComponent.directives || {};
                    this.buildComponent(lazyComponent)
                });
            else this.buildComponent(fnComponent);
        }

        public disconnectedCallback() {
            this.hooksCaller(Hooks.onDestroy);
            this.removeStyles.forEach(item => item());
        }
        public adoptedCallback() {
            this.hooksCaller(Hooks.adopted);
        }

        /**
         * Observed attributes
         */
        public observedAttrWatchers: ObservedAttributeWatcher = {};
        static get observedAttributes(): string[] {
            return (fnComponent as any).__observedAttrs || [];
        }
        public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
            this.hooksCaller(Hooks.attributeChanged, [name, oldValue, newValue]);
            if (!this.observedAttrWatchers[name]) this.observedAttrWatchers[name] = {
                watchers: [],
                value: null
            };
            this.observedAttrWatchers[name].value = newValue;
            this.observedAttrWatchers[name].watchers.forEach(watcher => watcher(newValue, oldValue));
            this.detectChanges();
        }

        public hooksCaller(key: Hooks, args: any[] = []) {
            this.hooks[key].forEach(hook => hook.isConnected() && hook.hook(...args));
            this.hooks[key] = this.hooks[key].filter(hook => hook.isConnected());
        }
    }
}