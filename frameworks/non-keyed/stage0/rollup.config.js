'use strict';

import * as path from 'path';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import minifyliterals from 'rollup-plugin-minifyliterals';

export default {
  input: 'app.js',
  output: {
    file: 'dist/app.min.js',
    format: 'iife',
    name: 'app',
    sourcemap: true,
  },
  plugins: [
    resolve({
      module: true,
      jsnext: true,
      browser: true,
    }),
    minifyliterals(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [ "es2016" ]
      ],
      plugins: [
        "external-helpers"
      ],
      runtimeHelpers: true,
      babelrc: false,
    }),
    terser()
  ],
}
