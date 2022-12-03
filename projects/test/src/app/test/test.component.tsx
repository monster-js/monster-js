import styles from './test.component.scss';
import { component } from '@monster-js/core';

export function test() {
    return <h1>test component</h1>
}

component(test, 'app-test', styles);
