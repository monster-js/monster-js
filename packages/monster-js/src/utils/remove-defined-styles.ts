import { LocalWindowInterface } from '../interfaces/local-window.interface';
import { styleSymbol } from '../symbols/style-symbol';

export function removeDefinedStyles(styles: string[][]) {
  const localWindow = window as LocalWindowInterface;

  const decrementStyleCount = (id: string) => {
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
