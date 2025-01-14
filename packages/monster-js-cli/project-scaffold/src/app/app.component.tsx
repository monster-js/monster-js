import styles from './app.component.scss';
import { component } from "monster-js";

export function App() {
    return <h1>Monster JS App</h1>;
}

component(App, {
    selector: 'app-root'
}, styles);
