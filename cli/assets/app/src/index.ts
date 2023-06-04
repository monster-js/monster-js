import '@monster-js/core/reflect';
import styles from './styles.scss';
import { App } from "./app/app.component";
import { createComponent, globalStyle } from "@monster-js/core";

globalStyle(styles);

customElements.define('app-root', createComponent(App));
