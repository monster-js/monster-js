import './app.component.scss';
import { Component } from '@monster-js/core';

@Component('app-root')
export class AppComponent {
    date = new Date().getTime();

    constructor() {
        setInterval(() => {
            this.date = new Date().getTime();
        }, 1000);
    }

    public render() {
        return <div>
            <h1>Hello world</h1>
            <app-child date={this.date} prop:date={this.date}></app-child>
            <button is="app-button" date={this.date} prop:date={this.date}></button>
        </div>
    }
}