const styleSymbol = Symbol('WecoJsStylesSymbol');

export function defineStyles(styles: any[]) {
    const _window: any = window;

    const incrementStyleCount = (id: string) => {
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