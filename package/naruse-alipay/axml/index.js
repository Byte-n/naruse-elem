const { getBaseTemplate } = require('naruse-webpack-runner/dist/mxml/getTemplate');
const fs = require('fs');
const path = require('path');

const componentjsFile = `
import { createMainBehavior } from './lib.js';
// eslint-disable-next-line no-undef
Component(createMainBehavior());
`

function main(outputPath) {
    // 路径不存在则创建
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }
    // 获取基础模板
    const {
        recursiveTemplateString,
        nonRecursiveTemplateString
    } = getBaseTemplate();
    // 写入不可迭代基础模板
    fs.writeFileSync(path.join(outputPath, 'base.axml'), nonRecursiveTemplateString);
    // 生成迭代模版
    const mainTemplate = '<import src="./base.axml" />\n'
        + recursiveTemplateString
        + '\n<template is="base_template" data="{{i:node}}"/>';
    // 生成主模版的json
    const mainTemplateJsonString = JSON.stringify({
        "component": true,
        "usingComponents": {
            "naruse-element": "./index"
        }
    });
    fs.writeFileSync(path.join(outputPath, 'index.json'), mainTemplateJsonString);
    fs.writeFileSync(path.join(outputPath, 'index.axml'), mainTemplate);
    fs.writeFileSync(path.join(outputPath, 'index.js'), componentjsFile);
}

module.exports = {
    main,
};
