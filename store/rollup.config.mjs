import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/public_apis.ts',
    output: [
        {
            file: 'dist/index.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
            globals: { '@monster-js/core': '@monster-js/core' }
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
            exports: 'named',
            globals: { '@monster-js/core': '@monster-js/core' }
        },
        {
            name: 'MonsterJS',
            file: 'dist/index.umd.js',
            format: 'umd',
            sourcemap: true,
            exports: 'named',
            globals: { '@monster-js/core': '@monster-js/core' }
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
    external: [ '@monster-js/core' ]
};