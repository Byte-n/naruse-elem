const naruseWebpackBuild = require('naruse-webpack-runner');
const path = require('path');


naruseWebpackBuild({
    mode: 'development',
    compilerType: 'singleHotComponent',
    sourceDir: path.resolve(__dirname, 'advert'),
    outputPath: path.resolve(__dirname, 'dev'),
    naruseExternal: false,
    isExportDefaultString: false,
    isWatch: true
}).catch(err => {
    if (Array.isArray(err)) {
        err.forEach(console.log);
    }
    console.log(err);
});
