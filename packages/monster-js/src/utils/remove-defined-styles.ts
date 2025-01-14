import { styleSymbol } from "./define-styles";

export function removeDefinedStyles(styles: any[]) {
    const _window: any = window;

    const decrementStyleCount = (id: string) => {
        if (_window[styleSymbol][id].count) {
            _window[styleSymbol][id].count--;
        }
    };

    styles.forEach((style) => {
        const id = style[0][0];

        decrementStyleCount(id);

        if (_window[styleSymbol][id].count === 0) {
            _window[styleSymbol][id].element.remove();
            _window[styleSymbol][id] = null;
        }
    });
}
