import type * as webpack from 'webpack'
import { parse } from 'css';

export default function (this: webpack.LoaderContext<any>, source: string) {
    return `module.exports = ${JSON.stringify(toObj(source))}`;
}

/** 将css code 转化为 js 对象 */
const toObj = (str, opts = {}) => {
    const rules = parse(str).stylesheet;
    const obj = {};

    if (!rules.rules) return obj;

    rules.rules = rules.rules.map((rule) => {
        if ('rule' != rule.type) return rule;
        rule.selectors.forEach((selector) => {
            var attrs;
            obj[selector.replace(/\./g, '')] = attrs = {};
            rule.declarations.forEach((dec) => {
                attrs[camel(dec.property)] = dec.value;
            });
        });
    });

    return obj;
};

const camel = str => str
    .replace(/(-[a-z])/g, x => x.toUpperCase())
    .replace(/-/g, '');


