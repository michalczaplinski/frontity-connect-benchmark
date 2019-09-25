import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const plugins = [
	babel({
		exclude: 'node_modules/**',
		plugins: [
      ["jsx-dom-expressions", {moduleName: 'mobx-jsx', alwaysCreateComponents: true}],
      ["@babel/plugin-proposal-decorators", { "legacy": true}],
      ["@babel/plugin-proposal-class-properties", { "loose": true}]
    ]
  }),
	resolve({ extensions: ['.js', '.jsx'] }),
	replace({"process.env.NODE_ENV": "'production'"})
];

if (process.env.production) {
	plugins.push(terser());
}

export default {
	input: 'src/main.jsx',
	output: {
		file: 'dist/main.js',
		format: 'iife'
	},
	plugins
};