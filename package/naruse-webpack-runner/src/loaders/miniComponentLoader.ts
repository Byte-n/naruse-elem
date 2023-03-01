import { normalizePath } from '@tarojs/helper'
import { getOptions, stringifyRequest } from 'loader-utils'
import * as path from 'path'

import type * as webpack from 'webpack'

interface PageConfig {
    content: any
    path: string
}

export default function (this: webpack.LoaderContext<any>, source: string) {
    const options = getOptions(this)
    const { config: loaderConfig } = options;
    const config = getPageConfig(loaderConfig, this.resourcePath)
    // 非页面文件不处理
    if (!config) {
        return source;
    }
    const configString = JSON.stringify(config);
    const loaders = this.loaders
    // 如果loader中有重复路径的，会导致生成的代码中有重复的import，所以这里要去重
    const thisLoaderIndex = loaders.findIndex(item => {
        return normalizePath(item.path).indexOf('miniComponentLoader') >= 0
    })
    const stringify = (s: string): string => stringifyRequest(this, s)
    const componentPath = this.request.split('!').slice(thisLoaderIndex + 1).join('!');
    const readlPath = stringify(componentPath);
    const result = `import { createMiniFactory } from 'Naruse'
import component from ${readlPath}
var config = ${configString}
var inst = createMiniFactory('page', component, config)`
    return result
}

export function getPageConfig(configs: Record<string, PageConfig>, resourcePath: string) {
    const configPath = removeExt(resourcePath) + '.config'
    for (const name in configs) {
        const config = configs[name]
        const currentPath = config.path.endsWith('.config') ? config.path : removeExt(config.path)
        if (currentPath === configPath) {
            return config.content
        }
    }
    return null;
}

function removeExt(file: string) {
    return path.join(path.dirname(file), path.basename(file, path.extname(file)))
}
