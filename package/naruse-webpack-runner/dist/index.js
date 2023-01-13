"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const baseConfig_1 = require("./core/baseConfig");
const template_1 = require("./core/template");
const defaultConfig = {
    mode: 'production',
    isWatch: false,
    compilerType: 'pages',
};
function build(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const config = Object.assign({}, defaultConfig, options);
        return new Promise((resolve, reject) => {
            const baseConfig = new baseConfig_1.BaseConfig(config);
            const webpackConfig = baseConfig.chain.toConfig();
            ;
            const compiler = (0, webpack_1.default)(webpackConfig);
            const callback = (err, stats) => __awaiter(this, void 0, void 0, function* () {
                if (err || stats.hasErrors()) {
                    const error = err !== null && err !== void 0 ? err : stats.toJson().errors;
                    return reject(error);
                }
                resolve(stats);
            });
            if (config.isWatch) {
                compiler.watch({
                    aggregateTimeout: 300,
                    poll: undefined
                }, callback);
            }
            else {
                compiler.run((err, stats) => {
                    compiler.close(err2 => callback(err || err2, stats));
                });
            }
        });
    });
}
exports.default = build;
build({
    outputPath: './demo/dist',
    pageConfig: {
        entry: 'index.js',
    },
    sourceDir: '/Users/hashiro/MiniProjects/blank/package/naruse-webpack-runner/demo',
    isWatch: true,
    template: new template_1.NaruseTemplate(),
    naruseExternalPath: '/Users/hashiro/MiniProjects/blank/package/naruse-webpack-runner/demo',
}).catch(err => {
    console.error(err);
});
//# sourceMappingURL=index.js.map