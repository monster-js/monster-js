import { Module } from '@monster-js/core/module';
import { RouterModule } from '@monster-js/router';
import { app } from './app.component';
import { test } from './test/test.component';

export const AppModule: Module = {
    root: app,
    modules: [RouterModule],
    components: [test]
}