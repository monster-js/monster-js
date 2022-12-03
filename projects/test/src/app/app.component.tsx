import styles from './app.component.scss';
import { component } from '@monster-js/core';

export function app() {
    return <h1>App Component</h1>
}

component(app, 'app-root', styles);
