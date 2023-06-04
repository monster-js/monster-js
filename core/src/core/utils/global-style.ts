import { Style } from "../component/interfaces/style.interface";

export const globalStyle = (styles: Style) => {
    const style = document.createElement('style');
    style.innerHTML = styles.styles;
    document.head.appendChild(style);
}