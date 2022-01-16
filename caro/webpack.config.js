const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/component/component.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'component.js'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./src/component/*", to(props){
                        return Promise.resolve(path.parse(props.absoluteFilename).base);
                    },
                },
            ],
        })
    ]
}
