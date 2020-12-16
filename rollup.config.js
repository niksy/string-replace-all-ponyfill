'use strict';

const path = require('path');
const { promises: fs } = require('fs');
const { default: resolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { default: babel } = require('@rollup/plugin-babel');

const transpileDependencies = babel({
	include: 'node_modules/escape-string-regexp/**',
	babelHelpers: process.env.BABEL_ENV === 'test' ? 'runtime' : 'bundled',
	babelrc: false,
	configFile: path.resolve(__dirname, '.babelrc')
});
transpileDependencies.name = 'babel-transpileDependencies';

module.exports = {
	input: 'index.js',
	output: [
		{
			file: 'cjs/index.js',
			format: 'cjs',
			exports: 'named',
			sourcemap: true
		},
		{
			file: 'esm/index.js',
			format: 'esm',
			exports: 'named',
			sourcemap: true
		}
	],
	plugins: [
		(() => {
			return {
				name: 'package-type',
				async writeBundle(output) {
					let prefix, type;
					if (output.file.includes('cjs/')) {
						prefix = 'cjs';
						type = 'commonjs';
					} else if (output.file.includes('esm/')) {
						prefix = 'esm';
						type = 'module';
					}
					if (typeof prefix !== 'undefined') {
						const package_ = path.join(prefix, 'package.json');
						try {
							await fs.unlink(package_);
						} catch (error) {}
						await fs.writeFile(
							package_,
							JSON.stringify({ type }),
							'utf8'
						);
					}
				}
			};
		})(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**'
		}),
		transpileDependencies,
		resolve(),
		commonjs()
	]
};
