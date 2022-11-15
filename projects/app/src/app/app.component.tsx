import styles from './app.component.scss';
import { component } from '@monster-js/core';
import { environment } from '../environments/environment';

export function app() {
    return <h1>App {environment.deployment}</h1>
}

component(app, 'app-root', styles);
