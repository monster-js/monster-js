import { useStyle } from '@monster-js/core';
import styles from './test.component.scss';

export function Test(props) {
    return <h1>I am here {props.date}</h1>
}

useStyle(Test, styles);
