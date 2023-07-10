import {
    META_TYPE,
    taroJsComponents
} from '@tarojs/helper'
import { toDashed } from '@tarojs/shared'
import { sources } from 'webpack'

import { componentConfig } from '../template/component'
import { addRequireToSource, getChunkEntryModule, getChunkIdOrName } from '../utils/webpack'

import type { Chunk, ChunkGraph, Compilation, Compiler } from 'webpack'
import type { AddPageChunks, IComponent } from '../utils/types'
import type TaroNormalModule from './TaroNormalModule'

const PLUGIN_NAME = 'TaroLoadChunksPlugin'
const { ConcatSource } = sources

interface IOptions {
    commonChunks: string[]
    isBuildPlugin: boolean
    framework: string
    addChunkPages?: AddPageChunks
    pages: Set<IComponent>
    needAddCommon?: string[]
    isIndependentPackages?: boolean
}

export default class TaroLoadChunksPlugin {
    commonChunks: string[]
    isBuildPlugin: boolean
    addChunkPages?: AddPageChunks
    pages: Set<IComponent>
    isCompDepsFound: boolean
    needAddCommon: string[]
    isIndependentPackages: boolean

    constructor(options: IOptions) {
        this.commonChunks = options.commonChunks
        this.isBuildPlugin = options.isBuildPlugin
        this.addChunkPages = options.addChunkPages
        this.pages = options.pages
        this.needAddCommon = options.needAddCommon || []
        this.isIndependentPackages = options.isIndependentPackages || false
    }

    apply(compiler: Compiler) {
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation: Compilation) => {
            let commonChunks

            compilation.hooks.afterOptimizeChunks.tap(PLUGIN_NAME, (chunks: Chunk[]) => {
                const chunksArray = Array.from(chunks)
                commonChunks = chunksArray.filter(chunk => this.commonChunks.includes(chunk.name) && chunkHasJs(chunk, compilation.chunkGraph)).reverse()

                this.isCompDepsFound = false
                for (const chunk of commonChunks) {
                    this.collectComponents(compiler, compilation, chunk)
                }
                if (!this.isCompDepsFound) {
                    chunksArray
                        .filter(chunk => !this.commonChunks.includes(chunk.name))
                        .some(chunk => {
                            this.collectComponents(compiler, compilation, chunk)
                            return this.isCompDepsFound
                        })
                }
            })

            compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(PLUGIN_NAME, (modules: sources.ConcatSource, { chunk }) => {
                const chunkEntryModule = getChunkEntryModule(compilation, chunk) as any
                if (chunkEntryModule) {
                    const entryModule: TaroNormalModule = chunkEntryModule.rootModule ?? chunkEntryModule
                    if (entryModule.miniType === META_TYPE.EXPORTS) {
                        const source = new ConcatSource()
                        source.add('module.exports=')
                        source.add(modules)
                        return source
                    } else {
                        return modules
                    }
                } else {
                    return modules
                }
            })

            /**
             * 在每个 chunk 文本刚生成后，require runtime
             */
            compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(PLUGIN_NAME, (modules: sources.ConcatSource, { chunk }) => {
                const chunkEntryModule = getChunkEntryModule(compilation, chunk) as any
                if (chunkEntryModule) {
                    const entryModule: TaroNormalModule = chunkEntryModule.rootModule ?? chunkEntryModule
                    const { miniType } = entryModule
                    if (this.needAddCommon.length) {
                        for (const item of this.needAddCommon) {
                            if (getChunkIdOrName(chunk) === item) {
                                return addRequireToSource(item, modules, commonChunks)
                            }
                        }
                    }
                    if (miniType === META_TYPE.ENTRY) {
                        return addRequireToSource(getChunkIdOrName(chunk), modules, commonChunks)
                    }
                    if ((miniType === META_TYPE.PAGE || miniType === META_TYPE.COMPONENT)
                    ) {
                        return addRequireToSource(getChunkIdOrName(chunk), modules, commonChunks)
                    }
                } else {
                    return modules
                }
            })
        })
    }

    collectComponents(compiler: Compiler, compilation: Compilation, chunk: Chunk) {
        const chunkGraph = compilation.chunkGraph
        const moduleGraph = compilation.moduleGraph
        const modulesIterable: Iterable<TaroNormalModule> = chunkGraph.getOrderedChunkModulesIterable(chunk, compiler.webpack.util.comparators.compareModulesByIdentifier) as any
        for (const module of modulesIterable) {
            if (module.rawRequest === taroJsComponents) {
                this.isCompDepsFound = true
                const includes = componentConfig.includes
                const moduleUsedExports = moduleGraph.getUsedExports(module, undefined)
                if (moduleUsedExports === null || typeof moduleUsedExports === 'boolean') {
                    componentConfig.includeAll = true
                } else {
                    for (const item of moduleUsedExports) {
                        includes.add(toDashed(item))
                    }
                }
                break
            }
        }
    }
}

function chunkHasJs(chunk: Chunk, chunkGraph: ChunkGraph) {
    if (chunk.name === chunk.runtime) return true
    if (chunkGraph.getNumberOfEntryModules(chunk) > 0) return true

    return Boolean(chunkGraph.getChunkModulesIterableBySourceType(chunk, 'javascript'))
}