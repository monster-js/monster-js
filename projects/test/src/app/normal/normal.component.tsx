import styles from './normal.component.scss';
import { component } from '@monster-js/core';

export function normal() {
    return <h1>normal component</h1>
}

component(normal, 'app-normal', styles);
