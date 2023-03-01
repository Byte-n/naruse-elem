import { getBaseTemplate } from './getTemplate';


/**
 * 可嵌套模版都必须写在主模版中，否则 import 无法使用
 */
const genMainTemplate = (baseTemplatePath: string) => {
        // 获取基础模板
        const {
            recursiveTemplateString
        } = getBaseTemplate();
        // 生成迭代模版
        const mainTemplate = `<import src="${baseTemplatePath}" />`
            + recursiveTemplateString
            + '<template is="base_template" data="{{i:node}}"/>';
        return mainTemplate;
}

/**
 * 生成不可嵌套模版
 */
const genBaseTemplate = () => {
    // 获取基础模板
    const {
        nonRecursiveTemplateString
    } = getBaseTemplate();
    return nonRecursiveTemplateString;
}

/**
 * 生成子组件js模版
 */
const genSubComponentJsTemplate = (libPath: string) => {
    return `import { createMainBehavior } from '${libPath}';Component(createMainBehavior());`
}


export {
    genMainTemplate,
    genBaseTemplate,
    genSubComponentJsTemplate
}
