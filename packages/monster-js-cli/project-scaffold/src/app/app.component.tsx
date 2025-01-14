import styles from './app.component.scss';
import { component } from "monster-js";

export function AppComponent() {
    return <h1>Monster JS App</h1>;
}

component(AppComponent, {
    selector: 'app-root'
}, styles);
