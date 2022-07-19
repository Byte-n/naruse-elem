const alias = require('@rollup/plugin-alias');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const typescript = require('@rollup/plugin-typescript');

const customResolver = nodeResolve({ extensions: ['.mjs', '.js', '.jsx', '.json', '.sass', '.scss', '.css'] });

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  input: './src/index.ts',
  output: {
    file: './build/lib.js',
    format: 'es',
  },
  plugins: [
    alias({ customResolver }),
    typescript(),
  ],
  external: ['rax-components', 'rax', 'rax-text', 'rap-sdk'],
};
