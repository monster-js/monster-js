import styles from './app.component.scss';
import { component, shadowComponent, useState } from '@monster-js/core';
import { Test } from './test.component';

export function app() {
    const [ date, setDate ] = useState(this, new Date().getTime());

    return <div>
        <button on:click={() => setDate(new Date().getTime())}>Set date</button>
        <h1>{date()}</h1>
        <Test v:for={[1,2,3,4,5]} prop:date={date()}></Test>
    </div>
}

shadowComponent(app, 'app-root', styles);
