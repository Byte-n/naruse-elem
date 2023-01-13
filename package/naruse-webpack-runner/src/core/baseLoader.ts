import { normalizePath } from '@tarojs/helper'
import { getOptions, stringifyRequest } from 'loader-utils'
import * as path from 'path'
import { NaruseWebpackRunnerOptions } from 'src'

import type * as webpack from 'webpack'

interface PageConfig {
  content: any
  path: string
}

export default function (this: webpack.LoaderContext<any>, source: string) {
  const options = getOptions(this)
  const { config: loaderConfig } = options;
  const config = getPageConfig(loaderConfig, this.resourcePath)

  if (typeof options.loaderMeta.modifyConfig === 'function') {
    options.loaderMeta.modifyConfig(config, source)
  }

  return `import { createMiniFactory } from 'Naruse'
var inst = Page(createMiniFactory('page', component))
`
}

export function getPageConfig (configs: Record<string, PageConfig>, resourcePath: string) {
  const configPath = removeExt(resourcePath) + '.config'
  for (const name in configs) {
    const config = configs[name]
    const currentPath = config.path.endsWith('.config') ? config.path : removeExt(config.path)
    if (currentPath === configPath) {
      return config.content
    }
  }
  return {}
}

function removeExt (file: string) {
  return path.join(path.dirname(file), path.basename(file, path.extname(file)))
}
