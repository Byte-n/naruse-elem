const { babel } = require('@rollup/plugin-babel');
const resolve = require('rollup-plugin-node-resolve');

module.exports = [
    {
        external: ['react'],
        input: 'src/index.js',
        output: [
            {
                file: 'dist/index.js',
                format: 'cjs',
                sourcemap: false,
                globals: {
                    react: 'React'
                }
            },
            {
                file: 'dist/index.esm.js',
                format: 'esm',
                sourcemap: false,
                globals: {
                    react: 'React'
                }
            }
        ],
        plugins: [
            resolve(),
            babel({
                babelHelpers: 'bundled',
                exclude: 'node_modules/**/*',
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            modules: false
                        }
                    ],
                    '@babel/preset-react'
                ]
            })
        ]
    }
];
