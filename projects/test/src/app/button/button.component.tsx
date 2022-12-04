import { useStyle } from '@monster-js/core';
import styles from './button.component.scss';

export function Button() {
    return <button>Button component</button>
}

useStyle(Button, styles);