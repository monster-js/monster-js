import { defineComponent } from "./define-component";
export function bootstrapApp(app) {
    const fnComponent = app;
    const selector = fnComponent.__meta.selector;
    if (!customElements.get(selector)) {
        defineComponent(selector, app);
    }
}
//# sourceMappingURL=bootstrap-app.js.map