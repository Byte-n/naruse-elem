const narusejsLoader = require('./narusejs-loader');
const uglifyJs = require('uglify-js');
const chalk = require('chalk');


/**
 * @description 创建一个缓存object
 * @author CHC
 * @date 2022-03-11 17:03:52
 * @param {string} code
 */
const exampleJsonObj = (code, advertUserDefine = {}) => ({
    message: 'OK',
    open_id: 'e000b529-879b-4bc2-8ab0-a33c829ee65d',
    results: [
        {
            creative_name: '测试创意-促销水印-功能点-Android-customAd',
            dest_url: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220222162004%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007951687%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v3&sign=AD247593B83EF4EA347728425E6B9C85&spm=a313p.266.ei5lud.1370863636957&short_name=Y4.77tvN&app=chrome',
            pid: 5207,
            img_size: '600*720',
            secondary_class: '',
            creative_id: '43330',
            primary_class: '',
            user_define: {
                id: 'templateDefine',
                title: '自定义模板',
                body: {
                    code,
                    ...advertUserDefine,
                },
            },
            group_id: 66685610,
            img_path: 'http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9MTM=_1646620823153.png',
            creative_type: '4',
            pid_name: 'FMB商品初级版-促销水印-单个水印点击',
            plan_id: 15967,
            rdomNum: 0,
            open_id: 'e000b529-879b-4bc2-8ab0-a33c829ee65d',
        },
    ],
    return_num: '1',
    status: '200',
    total_num: 1,
    result: {
        creative_name: '测试创意-促销水印-功能点-Android-customAd',
        dest_url: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_220222162004%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007951687%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1827490-v3&sign=AD247593B83EF4EA347728425E6B9C85&spm=a313p.266.ei5lud.1370863636957&short_name=Y4.77tvN&app=chrome',
        pid: 5207,
        img_size: '600*720',
        secondary_class: '',
        creative_id: '43330',
        primary_class: '',
        user_define: {
            id: 'templateDefine',
            title: '自定义模板',
            body: {
                code,
                ...advertUserDefine,
            },
        },
        group_id: 66685610,
        img_path: 'http://q.aiyongtech.com/ad/images/55S75p2/5aSH5Lu9MTM=_1646620823153.png',
        creative_type: '4',
        pid_name: 'FMB商品初级版-促销水印-单个水印点击',
        plan_id: 15967,
        rdomNum: 0,
        open_id: 'e000b529-879b-4bc2-8ab0-a33c829ee65d',
    },
    createTime: new Date().getTime(),
});

const pluginName = 'NaruseWebpackPlugin';
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

/**
 * @description 清除void 0
 * @author CHC
 * @date 2022-03-11 17:03:29
 * @param {*} string
 * @returns {*}
 */
const clearViod = (string) => {
    return string.replace(/void 0/g, 'undefined');
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
    const mainFileName = Object.keys(chunks)[0];
    const mainSource = chunks[mainFileName];
    const { code } = mainSource;
    const compiledCode = narusejsLoader(code, { minified: false });
    const reBuildCode = uglifyJs.minify(compiledCode, {
        compress: compressOption,
        mangle: { toplevel: true },
        output: { beautify: true },
    });
    const minifiedCode = uglifyJs.minify(compiledCode, {
        compress: { ...compressOption, ...{ drop_console: option.dropConsole || false } },
        mangle: { toplevel: true },
        output: { quote_style: 1 },
    }).code;
    chunks[mainFileName].code = `export default \`${clearViod(reBuildCode.code)}\``;
    plugin.emitFile({
        type: 'asset',
        fileName: 'naruse.min.js',
        source: minifiedCode,
    });
    plugin.emitFile({
        type: 'asset',
        fileName: 'naruse.dev.debug.json',
        source: JSON.stringify(exampleJsonObj(reBuildCode.code, option.advertUserDefine)),
    });
    console.log(chalk.green(new Date().toLocaleTimeString(), '【naruse-plugin】【生成完毕】'));
    console.log(chalk.white('广告系统用'), chalk.gray('— naruse.min.js'));
    console.log(chalk.white('本地开发用'), chalk.gray('— naruse.dev.debug.js'));
    console.log(chalk.white('本地缓存用'), chalk.gray('— naruse.dev.debug.json'));
};


/**
 *
 * @param {import('rollup').RollupOptions} options
 * @returns
 */
module.exports = function rollupPluginNaruse (option = {}) {
    return {
        name: pluginName,
        /**
         * @description 生成对应文件
         * @author CHC
         * @date 2022-03-14 16:03:59
         * @param {*} q
         * @param {*} w
         */
        generateBundle (options, bundle, isWrite) {
            main(this, option, bundle);
        },
    };
};
