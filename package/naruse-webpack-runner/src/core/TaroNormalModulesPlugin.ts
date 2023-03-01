import TaroSingleEntryDependency from '../dependencies/TaroSingleEntryDependency'
import TaroNormalModule from './TaroNormalModule'
import type { Compiler } from 'webpack'

const PLUGIN_NAME = 'TaroNormalModulesPlugin'

export default class TaroNormalModulesPlugin {
    apply(compiler: Compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (_, { normalModuleFactory }) => {
            normalModuleFactory.hooks.createModule.tapPromise(PLUGIN_NAME, (data, { dependencies }) => {
                const dependency = dependencies[0]
                if (dependency instanceof TaroSingleEntryDependency) {
                    return Promise.resolve(new TaroNormalModule(Object.assign(data,
                        { miniType: dependency.miniType, name: dependency.name }
                    )))
                }
                return Promise.resolve()
            })
        })
    }
}
