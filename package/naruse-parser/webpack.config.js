
import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';


export default {
    entry: './index.js',
    mode: 'production',
    output: {
        path: path.resolve('./dist'),
        filename: 'naruse-parse.js',
        libraryTarget: "module",
    },
    experiments: {
        outputModule: true,
    },
    plugins: [
        new TerserPlugin({
            terserOptions: {
                mangle: {
                    // properties: true,
                }
            }
        })
    ]
}
