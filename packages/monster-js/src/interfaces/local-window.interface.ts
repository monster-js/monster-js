import { styleSymbol } from '../symbols/style-symbol';

interface StyleElementInterface {
  count: number;
  element?: Element;
}

export interface LocalWindowInterface extends Window {
  [styleSymbol]?: Record<string, StyleElementInterface>;
}
