const { createFilter } = require('rollup-pluginutils')


const { parse } = require('css')

const toObj = (str, opts = {}) => {
    var rules = parse(str).stylesheet;
    var obj = {};

    if (!rules.rules) return obj;

    rules.rules = rules.rules.map(function (rule) {
        if ('rule' != rule.type) return rule;
        rule.selectors.forEach(function (selector) {
            obj[selector.replace(/\./g, '')] = attrs = {};
            rule.declarations.forEach(function (dec) {
                attrs[camel(dec.property)] = dec.value;
            });
        })
    });

    return obj
}

const camel = str => str
    .replace(/(-[a-z])/g, x => x.toUpperCase())
    .replace(/-/g, '')

const parsePx = val => /^-?\d+px$/.test(val)
    ? parseFloat(val)
    : val



module.exports = function scss(options = {}) {
    const filter = createFilter(
        options.include || ['/**/*.css', '/**/*.scss', '/**/*.sass'],
        options.exclude
    );
    const includePaths = options.includePaths || ['node_modules/'];
    includePaths.push(process.cwd());

    return {
        async transform(code, id) {
            if (!filter(id)) {
                return;
            }
            return ` export default ${JSON.stringify(toObj(code))}`;
        },
    };
}
