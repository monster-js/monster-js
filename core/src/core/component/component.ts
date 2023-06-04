import { Style } from "./interfaces/style.interface";

export const component = (fnComponent: any, styles: Style) => fnComponent.__styles = styles;
