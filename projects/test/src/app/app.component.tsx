import styles from './app.component.scss';
import { component } from '@monster-js/core';
import { test } from './test/test.component';

export function app() {
    return <fragment>
        <h1>App Component</h1>
        <a router:link="/">Root</a>
        <a router:link="/home">Home</a>
        <app-route
            prop:path="/home"
            prop:component={test}
        ></app-route>
    </fragment>
}

component(app, 'app-root', styles);
