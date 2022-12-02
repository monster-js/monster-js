import styles from './slot.component.scss';
import { shadowComponent } from '@monster-js/core';

export function slot() {
    return <div>
        <slot></slot>
    </div>
}

shadowComponent(slot, 'app-slot', styles);
