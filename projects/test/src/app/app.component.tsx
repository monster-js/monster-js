import styles from './app.component.scss';
import { component } from '@monster-js/core';

export function app() {
    return <fragment>
        <h1>App Component</h1>
        <h1>App Component</h1>
        <h1>App Component</h1>
        <h1>App Component</h1>
    </fragment>
}

component(app, 'app-root', styles);
