import styles from './app.component.scss';
import { component } from "weco-js";

export function App() {
    return <h1>Weco JS App</h1>;
}

component(App, {
    selector: 'app-root'
}, styles);
