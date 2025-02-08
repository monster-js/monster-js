import { styleSymbol } from '../symbols/style-symbol';
export function removeDefinedStyles(styles) {
    const localWindow = window;
    const decrementStyleCount = (id) => {
        const style = localWindow[styleSymbol]?.[id];
        if (style && style.count) {
            style.count -= 1;
        }
    };
    styles.forEach((style) => {
        const id = style[0][0];
        decrementStyleCount(id);
        const savedStyle = localWindow[styleSymbol]?.[id];
        if (savedStyle && savedStyle.count === 0) {
            savedStyle.element?.remove();
            delete localWindow[styleSymbol][id];
        }
    });
}
//# sourceMappingURL=remove-defined-styles.js.map