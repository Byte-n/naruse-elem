const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');

const fs = require('fs');
const path = require('path');
const version = JSON.parse(fs.readFileSync(path.join(__dirname, './package.json'), 'utf-8')).version;
const replace = require('@rollup/plugin-replace');

const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: './src/index.ts',
  output: [{
    file: './build/lib.js',
    format: 'es',
  }, {
    file: '../../demo/demo-rap/lib.js',
    format: 'es',
  }],
  plugins: [
    replace({ __VERSION__: JSON.stringify(version) }),
    customResolver,
    typescript(),
  ],
  external: ['rax-components', 'rax', 'rax-text', 'rap-sdk'],
};
