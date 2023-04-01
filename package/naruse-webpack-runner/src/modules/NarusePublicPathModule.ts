import { RuntimeGlobals, RuntimeModule, Template } from "webpack";

class NarusePublicPathModule extends RuntimeModule {
    constructor() {
        super("public path");
    }

    /**
     * @description 生成 naruse 专属的公共路径模块
     * @author CHC
     * @date 2023-03-29 17:03:23
     */
    generate() {
        const fn = RuntimeGlobals.publicPath;
        return Template.asString([
            `${fn} = "";`,
        ]);
    }
}


export {
    NarusePublicPathModule
}
