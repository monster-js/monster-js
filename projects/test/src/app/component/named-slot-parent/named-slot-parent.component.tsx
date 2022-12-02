import styles from './named-slot-parent.component.scss';
import { component } from '@monster-js/core';

export function namedSlotParent() {
    return <h1>namedSlotParent component</h1>
}

component(namedSlotParent, 'app-named-slot-parent', styles);
