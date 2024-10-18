// 根据数据队列生成axml模版
import { js2xml } from 'xml-js';
import humps from 'humps';
import { eventCenterEventName, nativeCheckbox, nativeRadio, speicalConfig } from './data';

const camelCase = humps.camelize;

function genDoubleBracket(str) {
    return `{{${str}}}`;
}

function getNestElement() {
    return {
        block: {
            _attributes: {
                'a:if': genDoubleBracket('childNodes'),
            },
            template: {
                _attributes: {
                    'a:for': genDoubleBracket('childNodes'),
                    is: genDoubleBracket('item.naruseType'),
                    data: genDoubleBracket('...item'),
                }
            }
        }
    }
}

function generateTemplate(template, speicalConfig) {
    const { templateName, reflectTagName, attributes, events, nest, children } = template;
    const { baseAttributes, bubblingEvents } = speicalConfig;
    let templateObj: Record<string, any> = {};
    templateObj._attributes = {};
    Object.keys(baseAttributes).forEach(attribute => {
        templateObj._attributes[attribute] = genDoubleBracket(camelCase(baseAttributes[attribute]));
    });
    attributes.forEach(attribute => {
        if (baseAttributes && baseAttributes[attribute]) {
            attribute = baseAttributes[attribute];
        }
        templateObj._attributes[attribute] = genDoubleBracket(camelCase(attribute));
    });
    events.forEach(event => {
        let name = event;
        // 统一使用同一个事件中心
        const value = eventCenterEventName;
        // 事件冒泡 值名前需要把on替换成catch
        if (bubblingEvents.includes(event)) {
            name = name.replace('on', 'catch');
        }
        templateObj._attributes[name] = value;
    });
    if (nest && !children) {
        templateObj = { ...templateObj, ...getNestElement() };
    }
    if (children) {
        templateObj = { ...templateObj, '_text': children };
    }
    return {
        template: {
            _attributes: {
                name: templateName,
            },
            [reflectTagName]: templateObj
        }
    }
}

const options = { compact: true, ignoreComment: true, spaces: 4 };

/**
 * @description 获取需要迭代的模版
 * @author CHC
 * @date 2023-01-07 15:01:19
 * @returns {*}
 */
function getBaseTemplate() {
    const data = require('./data.js');
    const { templateList, speicalConfig } = data;
    // 模版分类为可迭代与不可迭代
    const recursiveTemplate = [];
    const nonRecursiveTemplate = [];
    templateList.forEach(template => {
        if (template.nest) {
            recursiveTemplate.push(template);
        } else {
            nonRecursiveTemplate.push(template);
        }
    })
    // 生成可迭代模版
    const newRecursiveTemplateList = recursiveTemplate.map((item) => generateTemplate(item, speicalConfig));
    // 其他需要迭代的模版也要加入
    newRecursiveTemplateList.push(getCheckboxTemplate());
    newRecursiveTemplateList.push(getRadioTemplate());
    newRecursiveTemplateList.push(getFramentTemplate());
    newRecursiveTemplateList.push(getNaruseSelfTemplate());
    newRecursiveTemplateList.push(getBaseNaruseTemplate());

    // 生成不可迭代模版
    const newNonRecursiveTemplateList = nonRecursiveTemplate.map((item) => generateTemplate(item, speicalConfig));
    // 生成对应的axml模版
    const recursiveTemplateString = newRecursiveTemplateList.map((item) => js2xml(item, options)).join('\n');
    const nonRecursiveTemplateString = newNonRecursiveTemplateList.map((item) => js2xml(item, options)).join('\n');
    return {
        recursiveTemplateString,
        nonRecursiveTemplateString,
    }
}

function getFramentTemplate () {
    return {
        template: {
            _attributes: {
                name: 'fragment',
            },
            ...getNestElement(),
        }
    }
}
/**
 * 自定义 单选 组件
 * label > radio, ...children
 * */
function getRadioTemplate () {
    return {
        template: {
            _attributes: {
                name: "radio"
            },
            label:{
                _attributes: {
                    for: genDoubleBracket('id'),
                },
                template: {
                    _attributes: {
                        is: nativeRadio.templateName,
                        data: genDoubleBracket(
                            [...Object.values(speicalConfig.baseAttributes), ...nativeRadio.attributes].join(',')
                        ),
                    }
                },
                ...getNestElement(),
            },
        }
    }
}
/**
 * 自定义 复选框 组件
 * label > checkbox, ...children
 * */
function getCheckboxTemplate () {
    return {
        template: {
            _attributes: {
                name: "checkbox"
            },
            label:{
                _attributes: {
                    for: genDoubleBracket('id'),
                },
                template: {
                    _attributes: {
                        is: nativeCheckbox.templateName,
                        data: genDoubleBracket(
                            [...Object.values(speicalConfig.baseAttributes), ...nativeCheckbox.attributes].join(',')
                        ),
                    }
                },
                ...getNestElement(),
            },
        }
    }
}

function getNaruseSelfTemplate () {
    return {
        template: {
            _attributes: {
                name: 'naruse-element',
            },
            'naruse-element': {
                _attributes: {
                    propHubKey: genDoubleBracket('propHubKey'),
                    parentMiddwareId: genDoubleBracket('parentMiddwareId'),
                }
            },
        }
    }
}

function getBaseNaruseTemplate() {
    return {
        template: {
            _attributes: {
                name: 'base_template',
            },
            template: {
                _attributes: {
                    is: genDoubleBracket('i.naruseType'),
                    data: genDoubleBracket('...i'),
                }
            }
        }
    }
}


export {
    getBaseTemplate
}
