import styles from './app.component.scss';
import { component, useState } from '@monster-js/core';

function Test(props) {
    return <h1>I am here {props.date}</h1>
}

export function app() {
    const [ date, setDate ] = useState(this, new Date().getTime());

    return <div>
        <button on:click={() => setDate(new Date().getTime())}>Set date</button>
        {date()}
        <Test v:for={[1,2,3,4,5]} prop:date={date()}></Test>
    </div>
}

component(app, 'app-root', styles);
