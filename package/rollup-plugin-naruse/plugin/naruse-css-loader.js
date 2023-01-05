const { createFilter } = require('rollup-pluginutils');


const { parse } = require('css');

/** 将css code 转化为 js 对象 */
const toObj = (str, opts = {}) => {
    const rules = parse(str).stylesheet;
    const obj = {};

    if (!rules.rules) return obj;

    rules.rules = rules.rules.map((rule) => {
        if ('rule' != rule.type) return rule;
        rule.selectors.forEach((selector) => {
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

const parsePx = val => (/^-?\d+px$/.test(val)
    ? parseFloat(val)
    : val);


module.exports = function scss (options = {}) {
    const filter = createFilter(
        options.include || ['/**/*.css', '/**/*.scss', '/**/*.sass'],
        options.exclude
    );
    const includePaths = options.includePaths || [];
    includePaths.push(process.cwd());

    return {
        async transform (code, id) {
            if (!filter(id)) {
                return;
            }
            return ` export default ${JSON.stringify(toObj(code))}`;
        },
    };
};
