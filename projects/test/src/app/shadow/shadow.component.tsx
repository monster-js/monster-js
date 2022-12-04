import styles from './shadow.component.scss';
import { shadowComponent } from '@monster-js/core';

export function shadow() {
    return <h1>shadow component</h1>
}

shadowComponent(shadow, 'app-shadow', styles, 'open');
