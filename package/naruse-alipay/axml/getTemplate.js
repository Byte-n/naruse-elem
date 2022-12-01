// 根据数据队列生成axml模版
const { js2xml } = require("xml-js");
const humps = require('humps');
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
    const { events: speicalEvent, attributes: speicalAttributes, baseAttributes, bubblingEvents } = speicalConfig;
    let templateObj = {};
    templateObj._attributes = {};
    Object.keys(baseAttributes).forEach(attribute => {
        templateObj._attributes[attribute] = genDoubleBracket(camelCase(baseAttributes[attribute]));
    });
    attributes.forEach(attribute => {
        if (speicalAttributes && speicalAttributes[attribute]) {
            attribute = speicalAttributes[attribute];
        }
        templateObj._attributes[attribute] = genDoubleBracket(camelCase(attribute));
    });
    events.forEach(event => {
        let name = event;
        let value = event;
        if (speicalEvent[event]) {
            value = speicalEvent[event];
        }
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

function getBaseTemplate() {
    const data = require('./data.js');
    const { templateList, speicalConfig } = data;
    const templateJsonList = templateList
        .map((item) => generateTemplate(item, speicalConfig));
        templateJsonList.push(getFramentTemplate());
        templateJsonList.push(getNaruseSelfTemplate());
    const templateStringList = templateJsonList.map((item) => js2xml(item, options));
    return templateStringList.join('\n');
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

function getNaruseSelfTemplate () {
    return {
        template: {
            _attributes: {
                name: 'naruse-element',
            },
            'naruse-element': {
                _attributes: {
                    component: genDoubleBracket('component'),
                }
            },
        }
    }
}

module.exports = {
    getBaseTemplate,
}