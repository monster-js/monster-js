import styles from './app.component.scss';
import { component } from '@monster-js/core';
import { environment } from '../environments/environment';
import { actionCreator, createStore } from '@monster-js/store';

const store = createStore({
    counter: 0
});

const counterActionCreator = actionCreator<{ counter: number }>(store, 'counter');

const increment = counterActionCreator<number, number>(() => {}, 'message')

export function app() {

    const [counter, setCounter] = store(this, 'counter');

    setCounter(1, 'hello')
    return <h1>App {environment.deployment}</h1>
}

component(app, 'app-root', styles);
