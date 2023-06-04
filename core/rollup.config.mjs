import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
    {
        input: 'src/core/di/reflect.ts',
        output: {
            file: 'dist/reflect.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named'
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript(),
            terser({
                compress: true,
                mangle: true
            })
        ],
    },
    {
        input: 'src/public_apis.ts',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: true,
                exports: 'named'
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm',
                sourcemap: true,
                exports: 'named'
            },
            {
                name: 'MonsterJS',
                file: 'dist/index.umd.js',
                format: 'umd',
                sourcemap: true,
                exports: 'named'
            }
        ],
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript(),
            terser({
                compress: true,
                mangle: true
            })
        ],
        external: []
    }
]