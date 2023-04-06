const narusejsLoader = require('./narusejs-loader');
const terser = require('terser');
const css = require('./naruse-css-loader');


const pluginName = 'rollup-plugin-naruse';
const compressOption = {
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
    if (!string) return string;
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
    if (!string) return string;
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
const main = async (plugin, option = {}, chunks) => {
    const { mode } = option;
    const isProduction = mode === 'production';
    const mainFileName = Object.keys(chunks)[0];
    const mainSource = chunks[mainFileName];
    const { code } = mainSource;
    const compiledCode = narusejsLoader(code, { minified: false });
    const reBuildCode = await terser.minify(compiledCode, {
        compress: { ...compressOption, ...{ drop_console: option.dropConsole || false },  },
        mangle: { toplevel: true },
    });
    const lastCode = clearScienceNumber(clearViod(reBuildCode.code));
    // 生产和开发
    chunks[mainFileName].code = isProduction ? lastCode : `export default \`${lastCode}\``;
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
        async generateBundle(options, bundle, isWrite) {
            main(this, option, bundle);
        },
    };
};
