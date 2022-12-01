const { getBaseTemplate } = require('./getTemplate.js');
const fs = require('fs');
const path = require('path');

function main (outputPath) {
    // 路径不存在则创建
    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath);
    }
    // 获取基础模板
    const baseTemplateString = getBaseTemplate();
    // 生成主模版
    const mainTemplate = baseTemplateString + '\n<template is="{{node.naruseType}}" data="{{...node}}"/>';
    // 生成主模版的json
    const mainTemplateJsonString = JSON.stringify({
        "component": true,
        "usingComponents": {
          "naruse-element": "./sub"
        }
    })
    fs.writeFileSync(path.join(outputPath, 'index.json'), mainTemplateJsonString);
    fs.writeFileSync(path.join(outputPath, 'index.axml'), mainTemplate);
    fs.copyFileSync(path.join(__dirname, 'template.js'), path.join(outputPath, 'index.js'));
    fs.writeFileSync(path.join(outputPath, 'sub.json'), mainTemplateJsonString);
    fs.writeFileSync(path.join(outputPath, 'sub.axml'), mainTemplate);
    fs.copyFileSync(path.join(__dirname, 'subTemplate.js'), path.join(outputPath, 'sub.js'));
}

main('./build');

module.exports = {
    main,
};