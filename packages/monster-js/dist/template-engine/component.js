import { defineComponent } from "../component/define-component";
export function component(fnComponent, config, styles) {
    const meta = config;
    const selector = config.selector;
    fnComponent.__meta = meta;
    if (styles)
        fnComponent.__styleMeta = styles;
    if (!customElements.get(selector))
        defineComponent(fnComponent);
    return fnComponent;
}
//# sourceMappingURL=component.js.map