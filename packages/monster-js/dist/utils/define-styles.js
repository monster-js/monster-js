export const styleSymbol = Symbol('MonsterJsStylesSymbol');
export function defineStyles(styles) {
    const _window = window;
    const incrementStyleCount = (id) => {
        if (!_window[styleSymbol]) {
            _window[styleSymbol] = {};
        }
        if (!_window[styleSymbol][id]) {
            _window[styleSymbol][id] = {
                count: 0,
                element: null
            };
        }
        _window[styleSymbol][id].count++;
    };
    styles.forEach((style) => {
        const id = style[0][0];
        incrementStyleCount(id);
        if (_window[styleSymbol][id].count === 1) {
            const styleEl = document.createElement('style');
            styleEl.textContent = style.toString();
            document.head.appendChild(styleEl);
            _window[styleSymbol][id].element = styleEl;
        }
    });
}
//# sourceMappingURL=define-styles.js.map