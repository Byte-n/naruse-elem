import { RuntimeGlobals, RuntimeModule, Template } from "webpack";

class NaruseLoadScript extends RuntimeModule {
    constructor() {
        super("load script");
    }

    /**
     * @description 生成 naruse 专属的加载脚本模块，用于加载外部脚本，通过 $$import 来加载脚本
     * @author CHC
     * @date 2023-03-29 17:03:23
     */
    generate() {
        // 生成使用 naruse 外部加载并运行的脚本
        const fn = RuntimeGlobals.loadScript;
        return Template.asString([
            '// this template just for Naruse & naruse-parser load script',
            '// It\'s through global variable $$import to load script',
            '// cache inProgress scripts',
            'var inProgress = {};',
            `${fn} = function (url, onEnd) {`,
            Template.indent([
                'if (inProgress[url]) {',
                Template.indent([
                    'inProgress[url].then(onEnd);',
                    'return;',
                ]),
                '}',
                'if (typeof $$import !== \'function\') {',
                Template.indent([
                    'throw new Error(\'$$import 函数不存在！\');',
                ]),
                '}',
                'inProgress[url] = $$import(url);',
                'inProgress[url].then(setTimeout.bind(null, onEnd));',
            ]),
            '};',
        ]);
    }
}


export {
    NaruseLoadScript
}
