import styles from './pure.component.scss';
import { useStyle } from '@monster-js/core';

export function Pure() {
    return <h1>Pure component</h1>
}

useStyle(Pure, styles);
