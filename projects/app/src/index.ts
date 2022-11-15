import { bootstrap, Module } from '@monster-js/core/module';
import { app } from "./app/app.component";

const AppModule: Module = {
    root: app
};

bootstrap(AppModule);
