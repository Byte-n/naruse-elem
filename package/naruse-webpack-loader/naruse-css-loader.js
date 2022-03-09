const css = require('css');
const cc = require('')

const c2obj = (str) => {
    var rules = css.parse(str).stylesheet;
    var obj = {};
  
    if (!rules.rules) return obj;
  
    rules.rules = rules.rules.map(function(rule) {
      if ('rule' != rule.type) return rule;
      rule.selectors.forEach(function(selector) {
        obj[selector] = attrs = {};
        rule.declarations.forEach(function(dec) {
          attrs[cc(dec.property)] = dec.value;
        });
      })
    });
  
    return obj;
}