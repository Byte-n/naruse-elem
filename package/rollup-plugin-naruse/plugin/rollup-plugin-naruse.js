const narusejsLoader = require('./narusejs-loader');
const uglifyJs = require('uglify-js');
const chalk = require('chalk');
const css = require('./naruse-css-loader');


const pluginName = 'rollup-plugin-naruse';
const compressOption = {
    unused: true,
    toplevel: true,
    unsafe_undefined: true,
    typeofs: false,
    evaluate: false,
    sequences: false,
    join_vars: false,
    assignments: false,
    reduce_vars: false,
    spreads: false,
};

const scienceNumberReg = /[\d]+[e][\d]+/g;

/**
 * @description 清除void 0
 * @author CHC
 * @date 2022-03-11 17:03:29
 * @param {*} string
 * @returns {*}
 */
const clearViod = (string) => {
    return clearCallSpeardArugment(string.replace(/void 0/g, 'undefined'));
};

/**
 * @description 替换不支持的callarguments
 * @author CHC
 * @date 2022-03-21 18:03:37
 * @param {*} string
 * @returns {*}
 */
const clearCallSpeardArugment = (string) => {
    return string
        .replace('.call(this, ...arguments)', '.apply(this, arguments)')
        .replace('.call(this,...arguments)', '.apply(this,arguments)');
};

/**
 * @description 清除科学记数法
 * @author CHC
 * @date 2022-03-16 11:03:31
 * @param {string} string
 */
const clearScienceNumber = (string) => {
    while (true) {
        const matchRes = string.match(scienceNumberReg);
        if (!matchRes) break;
        string = string.replace(matchRes[0], Number(matchRes[0]));
    }
    return string;
};


/**
 * @description 插件主处理器
 * @author CHC
 * @date 2022-03-14 17:03:42
 * @param {import('rollup').PluginContext} plugin
 * @param {Object} [option={}]
 * @param {import('rollup').OutputBundle} chunks
 */
const main = (plugin, option = {}, chunks) => {
    const { mode } = option;
    const isProduction = mode === 'production';
    const mainFileName = Object.keys(chunks)[0];
    const mainSource = chunks[mainFileName];
    const { code } = mainSource;
    const compiledCode = narusejsLoader(code, { minified: false });
    const reBuildCode = uglifyJs.minify(compiledCode, {
        compress: { ...compressOption, ...{ drop_console: option.dropConsole || false } },
        mangle: { toplevel: true },
        output: !isProduction ? { beautify: true } : { quote_style: 1 },
    });
    // const minifiedCode = uglifyJs.minify(compiledCode, {
    //     compress: { ...compressOption, ...{ drop_console: option.dropConsole || false } },
    //     mangle: { toplevel: true },
    //     output: { quote_style: 1 },
    // }).code;

    const lastCode = clearScienceNumber(clearViod(reBuildCode.code));
    // 生产和开发
    chunks[mainFileName].code = isProduction ? lastCode : `export default \`${lastCode}\``;
    // plugin.emitFile({
    //     type: 'asset',
    //     fileName: 'naruse.min.js',
    //     source: clearScienceNumber(clearViod(minifiedCode)),
    // });
    // plugin.emitFile({
    //     type: 'asset',
    //     fileName: 'naruse.dev.debug.json',
    //     source: JSON.stringify(exampleJsonObj(lastCode, option.advertUserDefine)),
    // });
    // console.log(chalk.green(new Date().toLocaleTimeString(), '【naruse-plugin】【生成完毕】'));
    // console.log(chalk.white('广告系统用'), chalk.gray('— naruse.min.js'));
    // console.log(chalk.white('本地开发用'), chalk.gray('— naruse.dev.debug.js'));
    // console.log(chalk.white('本地缓存用'), chalk.gray('— naruse.dev.debug.json'));
};


/**
 *
 * @param {import('rollup').RollupOptions} options
 * @returns
 */
module.exports = function rollupPluginNaruse(option = {}) {
    return {
        ...css(),
        name: pluginName,
        /**
         * @description 生成对应文件
         * @author CHC
         * @date 2022-03-14 16:03:59
         * @param {*} q
         * @param {*} w
         */
        generateBundle(options, bundle, isWrite) {
            main(this, option, bundle);
        },
    };
};
