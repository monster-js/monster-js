import styles from './slot-parent.component.scss';
import { component } from '@monster-js/core';

export function slotParent() {
    return <div>
        <app-slot>
            <h1>I am in the slot.</h1>
        </app-slot>
    </div>
}

component(slotParent, 'app-slot-parent', styles);
