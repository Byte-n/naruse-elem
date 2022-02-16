const { transform } = require("@babel/core");
const fs = require("fs");

const skipFucType = ['sensorbeacon', 'aybeacon'];


global.h = (type, props, ...childNodes) => {
  if (props && props.onClick) {
    props.onClick = props.onClick.map((event) => {
      const newEvent = {};
      newEvent.type = event.type;
      newEvent.targetId = event.targetId;
      delete event.targetId;
      delete event.type;
      newEvent.props = { ...event };
      if (skipFucType.includes(newEvent.type)) {
        newEvent.props.type = newEvent.type;
        newEvent.type = 'beacon';
      }
      return newEvent;
    })
  }
  childNodes = childNodes.flat(1);
  childNodes = childNodes.map(child => {
    if (typeof child === "string") {
      if (props &&  props.onClick) {
        return { type: 'text', childNodes: child , onClick: props.onClick}
      }
      return { type: 'text', childNodes: child };
    };
    // 动态变量
    if (child.type === 'dynamicText') {
      child.childNodes = child.childNodes[0].childNodes;
      return {
        isDynamicText: true,
        ...child,
        type: 'text',
      };
    }
    return child;
  })
  const node = ({ type, ...props });
  if (childNodes.length) node.childNodes = childNodes;
  return node;
}

const paserJsx = (code) => {
  return eval(transform(code).code);
}

const args = (process.argv.slice(2) || []).reduce((acc, arg) => Object.assign(acc, { [arg.split('=')[0]]: arg.split('=')[1] }), {});

console.log(args);
const testTemplate = paserJsx(fs.readFileSync(args.input));

fs.writeFileSync(args.output, ' export default ' + JSON.stringify(testTemplate, null, 2));

console.log('转换完成', args.output);