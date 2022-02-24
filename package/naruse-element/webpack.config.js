const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './component/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./component/*", to(props){
                        return Promise.resolve(path.parse(props.absoluteFilename).base);
                    },
                },
            ],
        })
    ]
}
