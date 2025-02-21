import { LocalWindowInterface } from '../interfaces/local-window.interface';
import { styleSymbol } from '../symbols/style-symbol';

export function defineStyles(styles: any[]) {
  const localWindow = window as LocalWindowInterface;

  const incrementStyleCount = (id: string) => {
    if (!localWindow[styleSymbol]) {
      localWindow[styleSymbol] = {};
    }
    if (!localWindow[styleSymbol]?.[id]) {
      localWindow[styleSymbol][id] = {
        count: 0,
        element: undefined,
      };
    }
    localWindow[styleSymbol][id].count += 1;
  };

  styles.forEach((style) => {
    const id = style[0][0];

    incrementStyleCount(id);

    if (localWindow[styleSymbol][id].count === 1) {
      const styleElement = document.createElement('style');
      styleElement.textContent = style.toString();
      document.head.appendChild(styleElement);
      localWindow[styleSymbol][id].element = styleElement;
    }
  });
}
