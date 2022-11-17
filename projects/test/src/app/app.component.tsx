import styles from './app.component.scss';
import { component, services } from '@monster-js/core';

export function app() {
    return <div style="display: flex; height: 70vh; align-items: center; justify-content: center;">
        <div style="text-align: center; font-family: arial;">
            <h1 style="font-weight: 400;">MonsterJS</h1>
            <h3 style="font-weight: 400;">Simple but powerful JavaScript framework.</h3>
            <p>Simple and lightweight</p>
            <p>Web Components</p>
            <a href="https://monster-js.org" target="_blank" style="color: white; background: #42b983; display: inline-block; padding: 12px 32px; border-radius: 50px; text-decoration: none;">Documentation</a>
        </div>
    </div>
}

component(app, 'app-root', styles);
