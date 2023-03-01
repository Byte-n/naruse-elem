import { genMainTemplate, genBaseTemplate } from "../mxml";

export class NaruseTemplate  {
    isSupportRecursive = true;
    /**
     * 生成基础模版
     */
    buildTemplate () {
        return genBaseTemplate();
    }

    /**
     * 生成页面模版
     */
    buildPageTemplate (importBaseTemplatePath: string) {
        return genMainTemplate(importBaseTemplatePath);
    }
}
