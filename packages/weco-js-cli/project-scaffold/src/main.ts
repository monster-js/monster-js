import styles from './styles.scss';
import { defineComponent, defineStyles } from "weco-js";
import { App } from "./app/app.component";

defineStyles([styles]);

defineComponent(App);
