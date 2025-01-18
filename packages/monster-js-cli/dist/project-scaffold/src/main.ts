import styles from './styles.scss';
import { defineComponent, defineStyles } from "monster-js";
import { AppComponent } from "./app/app.component";

defineStyles([styles]);

defineComponent(AppComponent);
