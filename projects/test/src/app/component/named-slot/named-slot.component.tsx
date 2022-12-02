import styles from './named-slot.component.scss';
import { component } from '@monster-js/core';

export function namedSlot() {
    return <h1>namedSlot component</h1>
}

component(namedSlot, 'app-named-slot', styles);
