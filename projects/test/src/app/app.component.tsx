import styles from './app.component.scss';
import { component, shadowComponent } from '@monster-js/core';
import { Button } from './button/button.component';

export function app() {
    return <fragment>
        <h1>App Component</h1>
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
    </fragment>
}

shadowComponent(app, 'app-root', styles);
