const path = require('path');


module.exports = {
    entry: './test.js',
    mode: 'none',
    target: 'node',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        iife: false,
    },
    optimization: {
        usedExports: false,
        minimize: false,
    },
    watch: true,
    stats: 'errors-only',
    module: {
        noParse: /exports/,
        rules: [{
            test: /\.js|jsx$/,
            use: {
                loader: './narusejs-loader.js',
            },
            parser: {
                amd: false,
                commonjs: false,
                system: false,
                harmony: false,
                requireInclude: false,
                requireEnsure: false,
                requireContext: false,
                browserify: false,
                requireJs: false,
                node: false,
            }
        }]
    }
}