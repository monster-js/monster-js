import styles from './styles.scss';
import { globalStyle } from "@monster-js/core";
import { bootstrap } from "@monster-js/core/module";
import { AppModule } from "./app/app.module";

globalStyle(styles);
bootstrap(AppModule);
