import { Hooks } from "../hook/enums/hooks.enum";
import { Hook } from "../hook/interfaces/hook.interface";
import { ObservedAttributeWatcher } from "../observed-attributes/interfaces/observed-attribute-watcher.interface";
import { ChangeDetectionStrategy } from "../state/enums/change-detection-strategy.enum";
import { Watcher } from "../watcher/interfaces/watcher.interface";
import { ComponentWrapper } from "./interfaces/component-wrapper.interface";
import { DefinedComponents } from "./interfaces/defined-components.interface";
import { FunctionComponent } from "./interfaces/function-component.interface";

export const createComponent = (fnComponent: FunctionComponent) => {
    return class extends (fnComponent.config.superClass || HTMLElement) implements ComponentWrapper {

        selector: string = fnComponent.config.selector;
        debounce: any;
        watchers: Watcher[] = [];
        conditionWatchers: Watcher[] = [];
        definedComponents: DefinedComponents = fnComponent.config.definedComponents;
        fakeDefinedComponents: DefinedComponents = fnComponent.config.fakeDefinedComponents;
        dataSource = fnComponent.config.dataSource;
        element: HTMLElement = null;
        changeDetectionStrategy: ChangeDetectionStrategy;
        componentShadowRoot: ShadowRoot;


        directives = fnComponent.config.directives || {};
        pipes = fnComponent.config.pipes || {};

        props: { [key: string]: any; } = {};
        setProps(props: { [key: string]: any; }) {
            this.props = props;
            this._hooksCaller(Hooks.onPropsChange);
            this.detectChanges();
        }


        constructor(changeDetectionStrategy: ChangeDetectionStrategy = ChangeDetectionStrategy.Default) {
            super();
            this.changeDetectionStrategy = changeDetectionStrategy;
        }


        /**
         * Observed attributes
         */
        observedAttrWatchers: ObservedAttributeWatcher = {};
        static get observedAttributes() {
            return fnComponent.config.observedAttributes || [];
        }
        attributeChangedCallback(name, oldValue, newValue) {
            this._hooksCaller(Hooks.attributeChanged, [name, oldValue, newValue]);
            if (!this.observedAttrWatchers[name]) this.observedAttrWatchers[name] = {
                watchers: [],
                value: null
            };
            this.observedAttrWatchers[name].value = newValue;
            this.observedAttrWatchers[name].watchers.forEach(watcher => watcher(newValue, oldValue));
            this.detectChanges();
        }


        detectChanges() {
            if (!this.isConnected || this.debounce || this.changeDetectionStrategy === ChangeDetectionStrategy.OnPush) return;
            this.debounce = setTimeout(() => {
                this._evaluate();
                this.debounce = null;
            });
        }

        connectedCallback() {
            this.element = fnComponent.bind({ __wrapper: this })(this.props);
            this._hooksCaller(Hooks.onInit);
            this._hooksCaller(Hooks.beforeViewInit);
            this._appendElement(this.element);
            this._hooksCaller(Hooks.afterViewInit);
        }

        disconnectedCallback() {
            this._hooksCaller(Hooks.onDestroy);
            const { styles } = fnComponent.config;
            if (styles) styles.unuse();
        }

        adoptedCallback() {
            this._hooksCaller(Hooks.adopted);
        }

        _evaluate() {
            let hasViewChanges: boolean = false;
            [...this.conditionWatchers, ...this.watchers].forEach(watcher => {
                if (watcher.isConnected() && watcher.isUpdated()) {
                    hasViewChanges = true;
                    watcher.update(watcher.val);
                }
            });

            this._hooksCaller(Hooks.onChangeDetection);
            this.watchers = this.watchers.filter(watcher => watcher.isConnected());
            this.conditionWatchers = this.conditionWatchers.filter(watcher => watcher.isConnected());

            if (hasViewChanges) this._hooksCaller(Hooks.onViewChange);
        }

        _appendElement(element: HTMLElement) {
            let root: HTMLElement | ShadowRoot = this;
            const { shadowMode, styles } = fnComponent.config;
            if (shadowMode) {
                root = this.attachShadow({ mode: shadowMode });
                this.componentShadowRoot = root;
            }
            if (styles) styles.use({ target: shadowMode ? root : document.head });

            root.appendChild(element);
        }


        hooks: { [k in Hooks]: Hook[] } = {
            onInit: [],
            onDestroy: [],
            beforeViewInit: [],
            afterViewInit: [],
            onChangeDetection: [],
            onViewChange: [],
            adopted: [],
            attributeChanged: [],
            onPropsChange: []
        };
        _hooksCaller(key: Hooks, args: any[] = []) {
            this.hooks[key].forEach(hook => hook.isConnected() && hook.hook(...args));
            this.hooks[key] = this.hooks[key].filter(hook => hook.isConnected());
        }


    }
}
