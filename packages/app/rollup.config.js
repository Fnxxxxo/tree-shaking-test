/**
 * Created by Jaron Long on 2019/10/21
 */
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import analyze from 'rollup-plugin-analyzer'
import externals from 'rollup-plugin-peer-deps-external'

const libraryName = 'CommonApi'

function entry(input, output) {
  return {
    input,
    output,
    // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
    external: ['window', 'document'],
    watch: {
      include: 'src/**'
    },
    preserveSymlinks: true,
    plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      externals(),
      // Allow node_modules resolution, so you can use 'external' to control
      // which external modules to include in the bundle
      // https://github.com/rollup/rollup-plugin-node-resolve#usage
      resolve({
        mainFields: ['browser']
      }),
      // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
      commonjs(),
      typescript({
        verbosity: 2,
        tsconfigDefaults: {
          extendedDiagnostics: process.env.NODE_ENV === 'production'
        },
        useTsconfigDeclarationDir: true,
        clean: process.env.NODE_ENV === 'production'
      }),
      // Resolve source maps to the original source
      sourceMaps()
    ]
  }
}

export default [
  entry('src/index.ts', [
    {
      dir: 'dist',
      format: 'cjs',
      chunkFileNames: 'bundle/chunk.[format].[hash].js',
      entryFileNames: '[name].[format].js',
      sourcemap: process.env.NODE_ENV === 'production'
    },
    {
      dir: 'dist',
      format: 'es',
      chunkFileNames: 'bundle/chunk.[format].[hash].js',
      entryFileNames: '[name].[format].js',
      sourcemap: process.env.NODE_ENV === 'production'
    }
  ])
]

