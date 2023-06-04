import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default [
    {
        input: './src/transformer.js',
        output: {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        plugins: [
            nodeResolve(),
            commonjs({
                ignoreDynamicRequires: true
            }),
            json(),
            terser({
                compress: true,
                mangle: true
            })
        ],
    },
    {
        input: './src/css.js',
        output: {
            file: 'dist/css.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        plugins: [
            nodeResolve(),
            commonjs({
                ignoreDynamicRequires: true
            }),
            json(),
            terser({
                compress: true,
                mangle: true
            })
        ],
    },
]