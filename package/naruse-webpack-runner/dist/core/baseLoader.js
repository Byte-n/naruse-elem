"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageConfig = void 0;
const loader_utils_1 = require("loader-utils");
const path = __importStar(require("path"));
function default_1(source) {
    const options = (0, loader_utils_1.getOptions)(this);
    const { config: loaderConfig } = options;
    const config = getPageConfig(loaderConfig, this.resourcePath);
    if (typeof options.loaderMeta.modifyConfig === 'function') {
        options.loaderMeta.modifyConfig(config, source);
    }
    return `import { createMiniFactory } from 'Naruse'
var inst = Page(createMiniFactory('page', component))
`;
}
exports.default = default_1;
function getPageConfig(configs, resourcePath) {
    const configPath = removeExt(resourcePath) + '.config';
    for (const name in configs) {
        const config = configs[name];
        const currentPath = config.path.endsWith('.config') ? config.path : removeExt(config.path);
        if (currentPath === configPath) {
            return config.content;
        }
    }
    return {};
}
exports.getPageConfig = getPageConfig;
function removeExt(file) {
    return path.join(path.dirname(file), path.basename(file, path.extname(file)));
}
//# sourceMappingURL=baseLoader.js.map