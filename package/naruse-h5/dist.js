import React, { Component, createElement } from 'react';

const createLogger = name => {
  const Logger = {
    debug() {
      console.debug(`[${name}][debugger]`, ...arguments);
    },

    warn() {
      console.warn(`[${name}][warn]`, ...arguments);
    },

    info() {
      console.info(`[${name}][info]`, ...arguments);
    },

    error() {
      console.error(`[${name}][error]`, ...arguments);
    }

  };
  return Logger;
};

const logger$1 = createLogger('naurse-error');
/**
 * @description 期望为某个类型，异步版
 * @author CHC
 * @date 2022-03-30 15:03:05
 * @param {*} { obj, type, name }
 * @returns {*}
 */

const exceptType = (obj, type, name) => {
  if (typeof obj !== type) {
    const res = {
      errMsg: `${name}:fail must has a ${type}`
    };
    logger$1.error(res.errMsg);
    return Promise.reject(res);
  }
};
/**
 * @description 期望为某个类型同步版
 * @author CHC
 * @date 2022-03-30 15:03:22
 * @param {*} obj
 * @param {*} type
 * @param {*} name
 * @returns {*}
 */

const exceptTypeSync = (obj, type, name) => {
  if (typeof obj !== type) {
    logger$1.error(`${name}:fail must has a ${type}`);
    return true;
  }

  return false;
};

const mitt = function (n) {
  return {
    all: n = n || new Map(),
    on: function (e, t) {
      var i = n.get(e);
      i ? i.push(t) : n.set(e, [t]);
    },
    off: function (e, t) {
      var i = n.get(e);
      i && (t ? i.splice(i.indexOf(t) >>> 0, 1) : n.set(e, []));
    },
    emit: function (e, ...t) {
      var i = n.get(e);
      i && i.slice().map(function (n) {
        n(t);
      }), (i = n.get("*")) && i.slice().map(function (n) {
        typeof n === 'function' && n(e, ...t);
      });
    },
    clear: function () {
      n.clear();
    }
  };
};
/** 全局事件中心 */


const globalEvent = mitt();
/**
 * 这里不要改成箭头函数
 * 需要利用 new 来执行(兼容)
 * 如果构造函数内部通过 return 语句返回了一个引用类型值，则 new 操作最终返回这个引用类型值
 * 否则返回刚创建的新对象。
 * 箭头函数没有 constructor
 * @returns mitt
 */

function EventBus(map) {
  return mitt(map);
}

class MethodHandler {
  constructor({
    name,
    success,
    fail,
    complete
  }) {
    this.methodName = name;
    this.__success = success;
    this.__fail = fail;
    this.__complete = complete;
  }
  /** 成功 */


  success(res = {}, resolve = Promise.resolve.bind(Promise)) {
    if (!res.errMsg) {
      res.errMsg = `${this.methodName}:ok`;
    }

    typeof this.__success === 'function' && this.__success(res);
    typeof this.__complete === 'function' && this.__complete(res);
    return resolve(res);
  }
  /** 失败 */


  fail(res = {}, reject = Promise.reject.bind(Promise)) {
    if (!res.errMsg) {
      res.errMsg = `${this.methodName}:fail`;
    } else {
      res.errMsg = `${this.methodName}:fail ${res.errMsg}`;
    }

    console.error(res.errMsg);
    typeof this.__fail === 'function' && this.__fail(res);
    typeof this.__complete === 'function' && this.__complete(res);
    return reject(res);
  }

}

const deferMap = {};

const getDeferPromise = () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  promise.resolve = resolve;
  promise.reject = reject;
  return promise;
};

const proxyObject = obj => {
  if (typeof Proxy !== 'function') {
    return obj;
  }

  return new Proxy(obj, {
    get(target, key) {
      if (!target[key]) {
        return obj[key] = getDeferPromise();
      }

      return obj[key];
    }

  });
};

const getDeferred = key => {
  if (!key) {
    return proxyObject(deferMap);
  }

  if (deferMap[key]) {
    return deferMap[key];
  } else {
    return deferMap[key] = getDeferPromise();
  }
};

const logger = createLogger('naruse-h5');

const reflectEventMap = {
  /** 点击事件处理 */
  click(e) {
    return {
      type: 'click',
      detail: {
        clientX: e.clientX,
        clientY: e.clientY,
        pageX: e.pageX,
        pageY: e.pageY
      },

      /** 阻止冒泡 */
      stopPropagation() {
        e.stopPropagation();
      }

    };
  },

  /** 加载完毕 */
  load(e) {
    return {
      type: 'load',
      detail: {
        width: e.target.width,
        height: e.target.height
      }
    };
  },

  /** 聚焦 */
  focus(e) {
    return {
      type: 'foucs',
      detail: {
        value: e.target.value
      }
    };
  },

  /** 失焦 */
  blur(e) {
    return {
      type: 'blur',
      detail: {
        value: e.target.value
      }
    };
  },

  /** 按键 */
  keydown(e) {
    e.stopPropagation();
    const {
      value
    } = e.target;
    const keyCode = e.keyCode || e.code;
    return {
      type: 'keydown',
      detail: {
        value,
        cursor: value.length,
        keyCode
      }
    };
  },

  /** 输入 */
  input(e) {
    return {
      type: 'input',
      detail: e.detail
    };
  }

};
/** 事件名称对应处理名称 */

const reflectEventNameMap = {
  click: 'onClick',
  load: 'onLoad',
  focus: 'onFocus',
  blur: 'onBlur',
  keydown: 'onKeyDown',
  input: 'onInput'
};
/**
 * @description 通用事件处理
 * @author CHC
 * @date 2022-03-18 16:03:45
 * @param {React.SyntheticEvent} e
 */

const commonEventHander = function (e) {
  const handler = this.props[reflectEventNameMap[e.type]];
  if (!handler || typeof handler !== 'function') return;
  const event = reflectEventMap[e.type];
  const res = reflectEventMap[e.type](e);
  res.timeStamp = new Date().getTime();
  event && handler(res);
};
/**
 * @description
 * @author CHC
 * @date 2022-07-08 15:07:54
 * @param {React.MouseEvent<T, MouseEvent>} event
 * @returns {*} 
 */

const commonMouseEventCreater = event => {
  const {
    altKey,
    ctrlKey,
    shiftKey,
    clientX,
    clientY,
    pageX,
    pageY,
    screenX,
    screenY,
    stopPropagation,
    type
  } = event;
  return {
    type,
    detail: {
      altKey,
      ctrlKey,
      shiftKey,
      clientX,
      clientY,
      pageX,
      pageY,
      screenX,
      screenY
    },
    stopPropagation,
    timeStamp: new Date().getTime()
  };
};

var cssStyle$2 = {"a-button":{"display":"block","outline":"0","WebkitAppearance":"none","boxSizing":"border-box","padding":"0","textAlign":"center","fontSize":"18px","height":"47px","lineHeight":"47px","borderRadius":"2px","overflow":"hidden","textOverflow":"ellipsis","wordBreak":"break-word","whiteSpace":"nowrap","color":"#000","backgroundColor":"#fff","border":"1px solid #eee"},"active":{"backgroundColor":"#ddd","color":"rgba(0,0,0,.3)"},"disabled":{"color":"rgba(0,0,0,.6)","backgroundColor":"rgba(255,255,255,.6)"}};

class Button extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      active: false
    };
    this.touch = false;
  }
  /** 当开始点击时 */


  onTouchStart() {
    const {
      disabled,
      hoverStartTime = 20
    } = this.props;
    if (disabled) return;
    this.touch = true;
    setTimeout(() => {
      this.setState({
        hover: true
      });
    }, hoverStartTime);
  }
  /** 点击结束时 */


  onTouchEnd() {
    const {
      disabled,
      hoverStayTime = 70
    } = this.props;

    if (disabled) {
      return;
    }

    this.touch = false;
    setTimeout(() => {
      if (!this.touch) {
        this.setState({
          hover: false
        });
      }
    }, hoverStayTime);
  }
  /** 当开始点击时 */


  onActiveStart() {
    const {
      disabled,
      hoverStartTime = 20
    } = this.props;
    if (disabled) return;
    this.touch = true;
    setTimeout(() => {
      this.setState({
        active: true
      });
    }, hoverStartTime);
  }
  /** 点击结束时 */


  onActiveEnd() {
    const {
      disabled,
      hoverStayTime = 70
    } = this.props;

    if (disabled) {
      return;
    }

    this.touch = false;
    setTimeout(() => {
      if (!this.touch) {
        this.setState({
          active: false
        });
      }
    }, hoverStayTime);
  }

  render() {
    const {
      type,
      disabled,
      style,
      className,
      hoverStyle,
      activeStyle,
      ...other
    } = this.props;
    const {
      hover,
      active
    } = this.state;
    const conStyle = { ...cssStyle$2['a-button'],
      ...(type ? cssStyle$2[type] : {}),
      ...style,
      ...(hover ? hoverStyle : {}),
      ...(active ? { ...cssStyle$2.active,
        ...activeStyle
      } : {})
    };
    return React.createElement("button", {
      onMouseEnter: this.onTouchStart.bind(this),
      onMouseLeave: this.onTouchEnd.bind(this),
      style: conStyle,
      disabled: disabled,
      className: className,
      onClick: commonEventHander.bind(this),
      onTouchStart: this.onTouchStart.bind(this),
      onTouchEnd: this.onTouchEnd.bind(this) // {...other}

    }, this.props.children);
  }

}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

class Checkbox extends Component {
  /** 改变事件 */
  handleChange(e) {
    e.stopPropagation();
    this.props.onChange && this.props.onChange({
      value: this.value
    });
  }

  render() {
    const {
      checked,
      name,
      color,
      value,
      disabled,
      ...nativeProps
    } = this.props;
    return React.createElement("input", _extends({
      ref: dom => {
        if (!dom) return;
        this.inputEl = dom;
        if (this.id) dom.setAttribute('id', this.id);
      },
      type: 'checkbox',
      value: value,
      name: name,
      style: {
        color
      },
      checked: checked,
      disabled: disabled,
      onChange: this.handleChange.bind(this)
    }, nativeProps));
  }

}

var cssStyle$1 = {"img-empty":{"opacity":"0"},"naruseImg":{"display":"inline-block","overflow":"hidden","position":"relative","fontSize":"0"},"naruseImg__widthfix":{"height":"100%"},"scaletofill":{"objectFit":"contain","width":"100%","height":"100%"},"aspectfit":{"objectFit":"contain","width":"100%","height":"100%"},"aspectfill":{"objectFit":"cover","width":"100%","height":"100%"},"widthfix":{"width":"100%"},"top":{"width":"100%"},"bottom":{"width":"100%","position":"absolute","bottom":"0"},"left":{"height":"100%"},"right":{"position":"absolute","height":"100%","right":"0"},"topright":{"position":"absolute","right":"0"},"bottomleft":{"position":"absolute","bottom":"0"},"bottomright":{"position":"absolute","right":"0","bottom":"0"}};

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
    this.imageOnLoad = this.imageOnLoad.bind(this);
    this.observer = {};
    this.imgRef = null;
  }

  componentDidMount() {
    if (this.props.lazyLoad) {
      this.observer = new IntersectionObserver(entries => {
        // 异步 api 关系
        if (entries[entries.length - 1].isIntersecting) {
          this.setState({
            isLoaded: true
          }, () => {
            this.imgRef.src = this.props.src;
          });
        }
      }, {
        rootMargin: '300px 0px'
      });
      this.observer.observe(this.imgRef);
    }
  }

  componentWillUnmount() {
    this.observer.disconnect && this.observer.disconnect();
  }
  /** 当图片加载完毕 */


  imageOnLoad = commonEventHander.bind(this);

  render() {
    const {
      className,
      src,
      style = {},
      mode,
      onError,
      imgProps
    } = this.props;
    const divStyle = { ...cssStyle$1.naruseImg,
      ...(mode === 'widthFix' ? cssStyle$1.naruseImg__widthfix : {})
    };
    const imgStyle = cssStyle$1[(mode || 'scaleToFill').toLowerCase().replace(/\s/g, '')];
    return React.createElement("div", {
      onClick: commonEventHander.bind(this),
      className: className,
      style: { ...divStyle,
        ...style
      }
    }, React.createElement("img", _extends({
      ref: img => this.imgRef = img,
      style: imgStyle,
      src: src,
      onLoad: this.imageOnLoad,
      onError: onError
    }, imgProps)));
  }

}

/** 是否是支持的type */

const getTrueType = function getTrueType(type, confirmType, password) {
  if (confirmType === 'search') type = 'search';
  if (password) type = 'password';

  if (typeof type === 'undefined') {
    return 'text';
  }

  if (!type) {
    throw new Error('unexpected type');
  }

  if (type === 'digit') type = 'number';
  return type;
};
/** 修复可控值 */


const fixControlledValue = function fixControlledValue(value) {
  return value ?? '';
};

class Input extends Component {
  constructor() {
    super();
    this.inputRef = null;
    this.isOnComposition = false;
    this.onInputExcuted = false;
    this.el = {};
    this.state = {
      _value: ''
    };
  }

  componentDidMount() {
    if (this.props.type === 'file') {
      this.fileListener = e => {
        this.props.onInput && this.props.onInput(e);
      };

      this.inputRef?.addEventListener('change', this.fileListener);
    }

    Object.defineProperty(this.el, 'value', {
      get: () => this.inputRef?.value,
      set: value => {
        this.setState({
          _value: value
        });
      },
      configurable: true
    });
    setTimeout(() => this.props.focus && this.inputRef?.focus());
  }
  /** 输入 */


  handleInput(e) {
    e.stopPropagation();
    const {
      type,
      maxlength,
      confirmType,
      password
    } = this.props;
    let {
      value
    } = e.target;
    const inputType = getTrueType(type, confirmType, password);

    if (inputType === 'number' && value && maxlength <= value.length) {
      value = value.substring(0, maxlength);
      e.target.value = value;
    }

    this._value = value;
    this.setState({
      _value: value
    });
    commonEventHander.call(this, {
      type: 'input',
      detail: {
        value,
        cursor: value.length
      }
    });
  }
  /** 聚焦 */


  handleFocus = commonEventHander.bind(this);
  /** 脱焦 */

  handleBlur = commonEventHander.bind(this);
  /** 改变 */

  handleChange = commonEventHander.bind(this);
  /** 按下 */

  handleKeyDown = e => {
    const {
      value
    } = e.target;
    const keyCode = e.keyCode || e.code;
    commonEventHander.call(this, e);
    keyCode === 13 && this.props.onConfirm && this.props.onConfirm({
      value
    });
  };

  render() {
    const {
      type,
      password,
      placeholder,
      disabled,
      maxlength,
      confirmType,
      name,
      className,
      value,
      controlled,
      ...nativeProps
    } = this.props;
    const {
      _value
    } = this.state;
    return React.createElement("input", {
      ref: input => {
        this.inputRef = input;
      },
      className: className // 受控则只使用外部值，非受控优先使用外部值
      ,
      value: fixControlledValue(controlled ? value : value ?? _value),
      type: getTrueType(type, confirmType, password),
      placeholder: placeholder,
      disabled: disabled,
      maxLength: maxlength,
      name: name,
      onInput: this.handleInput.bind(this),
      onFocus: this.handleFocus.bind(this),
      onBlur: this.handleBlur.bind(this),
      onChange: this.handleChange.bind(this),
      onKeyDown: this.handleKeyDown.bind(this)
    });
  }

}

var cssStyle = {"text":{"MozUserSelect":"none","WebkitUserSelect":"none","MsUserSelect":"none","userSelect":"none"},"textSelectable":{"MozUserSelect":"text","WebkitUserSelect":"text","MsUserSelect":"text","userSelect":"text"}};

class Text extends Component {
  state = {
    hover: false
  };
  /** 当开始点击时 */

  onTouchStart() {
    const {
      disabled,
      hoverStartTime = 20
    } = this.props;
    if (disabled) return;
    this.touch = true;
    setTimeout(() => {
      this.setState({
        hover: true
      });
    }, hoverStartTime);
  }
  /** 点击结束时 */


  onTouchEnd() {
    const {
      disabled,
      hoverStayTime = 70
    } = this.props;

    if (disabled) {
      return;
    }

    this.touch = false;
    setTimeout(() => {
      if (!this.touch) {
        this.setState({
          hover: false
        });
      }
    }, hoverStayTime);
  }

  render() {
    const {
      className,
      selectable = false,
      style,
      hoverStyle,
      ...restProps
    } = this.props;
    const {
      hover
    } = this.state;
    const cls = { ...cssStyle.text,
      ...(selectable ? cssStyle.textSelectable : {}),
      ...style,
      ...(hover ? hoverStyle : {})
    };
    return React.createElement("span", {
      onMouseEnter: this.onTouchStart.bind(this),
      onMouseLeave: this.onTouchEnd.bind(this),
      onTouchStart: this.onTouchStart.bind(this),
      onTouchEnd: this.onTouchEnd.bind(this),
      style: cls,
      className: className,
      onClick: commonEventHander.bind(this)
    }, this.props.children);
  }

}

class View extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }
  /** 当开始点击时 */


  onTouchStart() {
    const {
      disabled,
      hoverStartTime = 20
    } = this.props;
    if (disabled || !this.mounted) return;
    this.touch = true;
    setTimeout(() => {
      this.setState({
        hover: true
      });
    }, hoverStartTime);
  }
  /** 点击结束时 */


  onTouchEnd() {
    const {
      disabled,
      hoverStayTime = 70
    } = this.props;
    if (disabled || !this.mounted) return;
    this.touch = false;
    setTimeout(() => {
      if (!this.touch) {
        this.setState({
          hover: false
        });
      }
    }, hoverStayTime);
  }

  onMouseEnter(event) {
    const {
      onMouseEnter
    } = this.props;
    onMouseEnter && onMouseEnter(commonMouseEventCreater(event));
    this.onTouchStart();
  }

  onMouseMove(event) {
    const {
      onMouseMove
    } = this.props;
    onMouseMove && onMouseMove(commonMouseEventCreater(event));
  }

  onMouseLeave(event) {
    const {
      onMouseLeave
    } = this.props;
    onMouseLeave && onMouseLeave(commonMouseEventCreater(event));
    this.onTouchEnd();
  }

  render() {
    const {
      className,
      style,
      hoverStyle,
      ...other
    } = this.props;
    const {
      hover
    } = this.state;
    const conStyle = { ...style,
      ...(hover ? hoverStyle : {})
    };
    return React.createElement("div", {
      onMouseEnter: this.onMouseEnter.bind(this),
      onMouseLeave: this.onMouseLeave.bind(this),
      onMouseMove: this.onMouseMove.bind(this),
      onTouchStart: this.onTouchStart.bind(this),
      onTouchEnd: this.onTouchEnd.bind(this),
      className: className,
      style: conStyle,
      onClick: commonEventHander.bind(this)
    }, this.props.children);
  }

}

/** 组件映射表 */

const componentReflectMap = {
  button: Button,
  checkbox: Checkbox,
  image: Image,
  input: Input,
  text: Text,
  view: View
};
/**
 * @description 拦截下来的react.createElement
 * @author CHC
 * @date 2022-03-17 17:03:42
 * @param {*} type
 * @param {*} props
 * @param {*} children
 */

const naruseCreateElement = (type, props, ...children) => {
  transformRpx(props);

  if (typeof type === 'string') {
    const Component = componentReflectMap[type];

    if (!Component) {
      logger.warn('不支持的组件类型', type);
      return naruseCreateElement('view', null, `不支持的组件类型-${type}`);
    }

    return createElement(Component, props, ...children);
  }

  if (type.prototype instanceof Component) {
    return createElement(type, props, ...children);
  }

  if (typeof type === 'function') {
    props && (props.children = children);
    return type(props);
  }

  logger.warn('不支持的组件类型', type);
};

const rpxReg = /(\d+)\s?rpx/g;

const parsePx = val => {
  if (typeof val !== 'string') return val;
  const matchRes = val.match(rpxReg);
  if (!matchRes) return val;
  matchRes.forEach(item => {
    const num = parseFloat(item); // 按照手机和电脑的比例进行换算

    val = val.replace(item, `${(num / 2 * 1.4).toFixed(1)}px`);
  });
  return val;
};
/**
 * @description 将所有的rpx转换为px
 * @author CHC
 * @date 2022-03-25 15:03:47
 * @param {*} [props={}]
 * @returns {*}
 */


const transformRpx = (props = {}) => {
  if (!props) return;
  const {
    style
  } = props;

  if (style && typeof style === 'object') {
    for (const key in style) {
      style[key] = parsePx(style[key]);
    }
  }
};

const types = {
  num: 'num',
  string: 'string',
  name: 'name',
  bracketL: '[',
  bracketR: ']',
  braceL: '{',
  braceR: '}',
  parenL: '(',
  parenR: ')',
  comma: ',',
  semi: ';',
  colon: ':',
  dot: '.',
  question: '?',
  eq: '=',
  logicalOR: '||',
  logicalAND: '&&',
  bitwiseOR: '|',
  bitwiseXOR: '^',
  bitwiseAND: '&',
  plusMin: '+/-',
  incDec: '++/--',
  equality: '==/!=/===/!==',
  relational: '</>/<=/>=',
  prefix: '!/~',
  modulo: '%',
  star: '*',
  slash: '/',
  assign: '_=',
  _break: 'break',
  _continue: 'continue',
  _else: 'else',
  _for: 'for',
  _function: 'function',
  _if: 'if',
  _return: 'return',
  _var: 'var',
  _const: 'const',
  _let: 'let',
  _in: 'in',
  _instanceof: 'instanceof',
  _new: 'new',
  _import: 'import',
  _null: 'null',
  _true: 'true',
  _false: 'false',
  _void: 'void',
  _typeof: 'typeof',
  _delete: 'delete',
  _try: 'try',
  _catch: 'catch',
  _throw: 'throw',
  _finally: '_finally'
};
const emptyChar = ['\n', '\t', ' ', '\r'];

const isEmptyChar = char => emptyChar.includes(char);

const tt = types;
const keywords = [tt._break, tt._continue, tt._else, tt._for, tt._function, tt._if, tt._return, tt._const, tt._let, tt._null, tt._false, tt._true, tt._var, tt._in, tt._instanceof, tt._new];
const priority = {
  [tt.logicalOR]: 1,
  [tt.logicalAND]: 2,
  [tt.bitwiseOR]: 3,
  [tt.bitwiseAND]: 5,
  [tt.equality]: 6,
  [tt.relational]: 7,
  [tt.plusMin]: 9,
  [tt.modulo]: 10,
  [tt.star]: 10,
  [tt.slash]: 10,
  [tt._in]: 7,
  [tt._instanceof]: 7
}; // 标记器

class Token {
  constructor(input) {
    this.input = input;
    this.pos = 0;
    this.tokens = [];
  }

  scan() {
    while (1) {
      const code = this.input[this.pos];

      if (isEmptyChar(code)) {
        this.pos++;
        continue;
      }

      if (!code) break;
      code.match(/[a-zA-Z_$]/) ? this.readWord() : this.getTokenFromCode(code.charCodeAt());
    }

    return this.tokens;
  }

  getTokenFromCode(code) {
    switch (code) {
      case 46:
        return this.readToken_dot();

      case 40:
        ++this.pos;
        return this.ftk(tt.parenL);

      case 41:
        ++this.pos;
        return this.ftk(tt.parenR);

      case 59:
        ++this.pos;
        return this.ftk(tt.semi);

      case 63:
        ++this.pos;
        return this.ftk(tt.question);

      case 44:
        ++this.pos;
        return this.ftk(tt.comma);

      case 91:
        ++this.pos;
        return this.ftk(tt.bracketL);

      case 93:
        ++this.pos;
        return this.ftk(tt.bracketR);

      case 123:
        ++this.pos;
        return this.ftk(tt.braceL);

      case 125:
        ++this.pos;
        return this.ftk(tt.braceR);

      case 58:
        ++this.pos;
        return this.ftk(tt.colon);

      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        return this.readNumber(code);

      case 34:
      case 39:
        return this.readString(code);

      case 37:
      case 42:
      case 47:
        return this.readToken_mult_modulo_exp(code);

      case 124:
      case 38:
        return this.readToken_pipe_amp(code);

      case 43:
      case 45:
        return this.readToken_plus_min(code);

      case 60:
      case 62:
        return this.readToken_lt_gt(code);

      case 61:
      case 33:
        return this.readToken_eq_excl(code);
    }

    ++this.pos;
    console.warn(this.pos, `Unexpected character '${code}' ${String.fromCharCode(code)}`);
  }

  readWord() {
    let word = '';
    let code;

    while (code = this.input[this.pos]) {
      if (code.match(/[a-zA-Z0-9\_\$]/)) {
        word += code;
        this.pos++;
      } else break;
    }

    let type = tt.name;

    if (keywords.includes(word)) {
      type = word;
    }

    return this.ftk(type, word);
  }

  readToken_lt_gt(code) {
    const next = this.gnc();
    let size = 1;

    if (next === code) {
      size = code === 62 && this.gnc(2) === 62 ? 3 : 2;
      if (this.gnc(size) === 61) return this.finishOp(tt.assign, size + 1);
      return this.finishOp(tt.bitShift, size);
    }

    if (next === 61) size = 2;
    return this.finishOp(tt.relational, size);
  }

  readNumber(code) {
    let val = 0;

    while (code > 47 && code < 58 || code === 46) {
      val++;
      code = this.gnc(val);
    }

    return this.finishOp(tt.num, parseFloat(val));
  }

  readString(code) {
    const startCode = code;
    let out = '';
    code = this.gnc();

    while (code !== startCode) {
      out += this.input[++this.pos];
      code = this.gnc();
    }

    this.pos = this.pos + 2;
    return this.ftk(tt.string, out);
  }

  readToken_mult_modulo_exp(code) {
    const next = this.gnc();
    const operator = String.fromCharCode(code);
    const tokentype = priority[operator] && operator;

    if (next === 61) {
      this.pos++;
      return this.finishOp(tt.assign, 2);
    }

    return this.finishOp(tokentype, 1);
  }

  finishOp(type, size) {
    const str = this.input.substring(this.pos, this.pos + size);
    this.pos += size;
    return this.ftk(type, str);
  }

  ftk(type, value) {
    this.tokens.push({
      type,
      value,
      start: this.pos,
      end: this.pos + (value && value.length || type.length)
    });
  }

  readToken_pipe_amp(code) {
    const next = this.gnc();
    if (next === code) return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2);
    return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1);
  }

  readToken_dot() {
    const next = this.gnc();
    if (next >= 48 && next <= 57) return this.readNumber(true);
    this.pos++;
    return this.ftk(tt.dot);
  }

  gnc(size = 1) {
    return this.input[this.pos + size].charCodeAt();
  }

  readToken_plus_min(code) {
    const next = this.gnc();
    if (next === code) return this.finishOp(tt.incDec, 2);
    if (next === 61) return this.finishOp(tt.assign, 2);
    return this.finishOp(tt.plusMin, 1);
  }

  readToken_eq_excl(code) {
    const next = this.gnc();
    if (next === 61) return this.finishOp(tt.equality, this.gnc(2) === 61 ? 3 : 2);
    return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1);
  }

} // 解析器


class Parser {
  constructor(code) {
    this.tokens = new Token(code).scan();
    this.index = -1;
  }

  parse() {
    const node = {
      body: []
    };
    this.nextToken();
    return this.parseTopLevel(node);
  }

  eat(type) {
    if (this.type === type) {
      this.next();
      return true;
    }

    return false;
  }

  nextToken() {
    this.token = this.tokens[++this.index];
    this.type = this.token && this.token.type;
    this.value = this.token && this.token.value;
    this.start = this.token && this.token.start;
    this.end = this.token && this.token.end;
  }

  finishNode(node, type) {
    node.type = type;
    node.start = this.start || 0;
    node.end = this.end || 0;
    return node;
  }

  parseTopLevel(node) {
    while (this.type) {
      const stmt = this.parseStatement(true);
      node.body.push(stmt);
    }

    return this.finishNode(node, 'Program');
  }

  parseStatement(topLevel) {
    const node = {};

    switch (this.type) {
      case tt._break:
      case tt._continue:
        return this.parseBreakContinueStatement(node, this.value);

      case tt._for:
        return this.parseForStatement(node);

      case tt._function:
        {
          this.next();
          return this.parseFunctionStatement(node);
        }

      case tt._if:
        return this.parseIfStatement(node);

      case tt._return:
        return this.parseReturnStatement(node);

      case tt._const:
      case tt._var:
      case tt._let:
        return this.parseVarStatement(node, this.value);

      case tt.braceL:
        return this.parseBlock(node);

      case tt.semi:
        return this.parseEmptyStatement(node);

      default:
        {
          const expr = this.parseExpression();
          return this.parseExpressionStatement(node, expr);
        }
    }
  }

  parseExpressionStatement(node, expr) {
    node.expression = expr;
    this.eat(tt.semi);
    return this.finishNode(node, 'ExpressionStatement');
  }

  parseEmptyStatement(node) {
    this.next();
    return this.finishNode(node, 'EmptyStatement');
  }

  parseVarStatement(node, kind) {
    this.next();
    this.parseVar(node, false, kind);
    this.eat(tt.semi);
    return this.finishNode(node, 'VariableDeclaration');
  }

  parseVar(node, isFor, kind) {
    node.declarations = [];
    node.kind = kind;

    for (;;) {
      const decl = {};
      this.parseVarId(decl, kind);

      if (this.eat(tt.eq)) {
        decl.init = this.parseMaybeAssign(isFor);
      } else {
        decl.init = null;
      }

      node.declarations.push(this.finishNode(decl, 'VariableDeclarator'));
      if (!this.eat(tt.comma)) break;
    }

    return node;
  }

  parseIdent() {
    const node = {};

    if (this.type === tt.name) {
      node.name = this.value;
    } else {
      this.raise('无法处理的token');
    }

    this.next();
    return this.finishNode(node, 'Identifier');
  }

  parseMaybeAssign(forInit) {
    const left = this.parseMaybeConditional(forInit);

    if (this.isAssign()) {
      const node = {};
      node.operator = this.value;
      node.left = left;
      this.next();
      node.right = this.parseMaybeAssign(forInit);
      return this.finishNode(node, 'AssignmentExpression');
    }

    return left;
  }

  parseMaybeConditional(forInit) {
    const expr = this.parseExprOps(forInit);

    if (this.eat(tt.question)) {
      const node = {};
      node.test = expr;
      node.consequent = this.parseMaybeAssign();
      this.expect(tt.colon);
      node.alternate = this.parseMaybeAssign(forInit);
      return this.finishNode(node, 'ConditionalExpression');
    }

    return expr;
  }

  parseExprOps(forInit) {
    const expr = this.parseMaybeUnary(forInit);
    return this.parseExprOp(expr, -1, forInit);
  }

  parseExprOp(left, minPrec, forInit) {
    const prec = priority[this.type];

    if (prec && !forInit) {
      if (prec > minPrec) {
        const logical = this.type === tt.logicalOR || this.type === tt.logicalAND;
        const coalesce = this.type === tt.coalesce;
        const op = this.value;
        this.next();
        const right = this.parseExprOp(this.parseMaybeUnary(forInit), prec, forInit);
        const node = this.buildBinary(left, right, op, logical || coalesce);
        return this.parseExprOp(node, minPrec, forInit);
      }
    }

    return left;
  }

  buildBinary(left, right, op, logical) {
    const node = {};
    node.left = left;
    node.operator = op;
    node.right = right;
    return this.finishNode(node, logical ? 'LogicalExpression' : 'BinaryExpression');
  }

  parseMaybeUnary(forInit) {
    let expr;

    if ([tt.incDec, tt.prefix, tt.plusMin].includes(this.type)) {
      const node = {};
      const update = this.type === tt.incDec;
      node.operator = this.value;
      node.prefix = true;
      this.next();
      node.argument = this.parseMaybeUnary(forInit);
      expr = this.finishNode(node, update ? 'UpdateExpression' : 'UnaryExpression');
    } else {
      expr = this.parseExprSubscripts(forInit);

      while (this.type === tt.incDec) {
        const node = {};
        node.operator = this.value;
        node.prefix = false;
        node.argument = expr;
        this.next();
        expr = this.finishNode(node, 'UpdateExpression');
      }
    }

    return expr;
  }

  parseExprSubscripts(forInit) {
    const expr = this.parseExprAtom(forInit);
    const result = this.parseSubscripts(expr, false, forInit);
    return result;
  }

  parseSubscript(base, noCalls) {
    const computed = this.eat(tt.bracketL);

    if (computed || this.eat(tt.dot)) {
      const node = {};
      node.object = base;

      if (computed) {
        node.property = this.parseExpression();
        this.expect(tt.bracketR);
      } else {
        node.property = this.parseIdent();
      }

      node.computed = !!computed;
      base = this.finishNode(node, 'MemberExpression');
    } else if (!noCalls && this.eat(tt.parenL)) {
      const exprList = this.parseExprList(tt.parenR);
      const node = {};
      node.callee = base;
      node.arguments = exprList;
      base = this.finishNode(node, 'CallExpression');
    }

    return base;
  }

  parseExpression(forInit) {
    const expr = this.parseMaybeAssign(forInit);

    if (this.type === tt.comma) {
      const node = {};
      node.expressions = [expr];

      while (this.eat(tt.comma)) node.expressions.push(this.parseMaybeAssign(forInit));

      return this.finishNode(node, 'SequenceExpression');
    }

    return expr;
  }

  parseSubscripts(base, noCalls) {
    while (true) {
      const element = this.parseSubscript(base, noCalls);

      if (element === base) {
        return element;
      }

      base = element;
    }
  }

  parseLiteral(value) {
    const node = this.finishNode({
      value: (this.type === tt.string ? String : parseFloat)(value)
    }, 'Literal');
    this.next();
    return node;
  }

  parseExprAtom(forInit) {
    const node = {};

    switch (this.type) {
      case tt.name:
        return this.parseIdent(false);

      case tt.num:
      case tt.string:
        return this.parseLiteral(this.value);

      case tt._null:
      case tt._true:
      case tt._false:
        node.value = this.type === tt._null ? null : this.type === tt._true;
        node.raw = this.type;
        this.next();
        return this.finishNode(node, 'Literal');

      case tt.parenL:
        return this.parseParenAndDistinguishExpression(forInit);

      case tt.bracketL:
        this.next();
        node.elements = this.parseExprList(tt.bracketR);
        return this.finishNode(node, 'ArrayExpression');

      case tt.braceL:
        return this.parseObj(false);

      case tt._function:
        this.next();
        return this.parseFunctionStatement(node);

      case tt._new:
        return this.parseNew();

      default:
        this.raise(`无法处理的token${this.type}`);
    }
  }

  parseNew() {
    const node = {};
    this.next();
    node.callee = this.parseSubscripts(this.parseExprAtom(), true);
    if (this.eat(tt.parenL)) node.arguments = this.parseExprList(tt.parenR);else node.arguments = [];
    return this.finishNode(node, 'NewExpression');
  }

  parseObj(isPattern) {
    const node = {};
    let first = true;
    node.properties = [];
    this.next();

    while (!this.eat(tt.braceR)) {
      if (!first) {
        this.expect(tt.comma);
      } else first = false;

      const prop = this.parseProperty(isPattern);
      node.properties.push(prop);
    }

    return this.finishNode(node, isPattern ? 'ObjectPattern' : 'ObjectExpression');
  }

  parseProperty() {
    const prop = {};
    prop.key = this.type === tt.num || this.type === tt.string ? this.parseExprAtom() : this.parseIdent();

    if (this.eat(tt.colon)) {
      prop.value = this.parseMaybeAssign(false);
      prop.kind = 'init';
    } else this.raise('属性名后无效属性');

    return this.finishNode(prop, 'Property');
  }

  parseParenAndDistinguishExpression() {
    return this.parseParenExpression();
  }

  parseVarId(decl) {
    decl.id = this.parseIdent();
  }

  parseReturnStatement(node) {
    this.next();
    if (this.eat(tt.semi) || this.type === tt.braceR) node.argument = null;else node.argument = this.parseExpression();
    return this.finishNode(node, 'ReturnStatement');
  }

  parseIfStatement(node) {
    this.next();
    node.test = this.parseParenExpression();
    node.consequent = this.parseStatement();
    node.alternate = this.eat(tt._else) ? this.parseStatement() : null;
    return this.finishNode(node, 'IfStatement');
  }

  parseParenExpression() {
    this.expect(tt.parenL);
    const val = this.parseExpression();
    this.expect(tt.parenR);
    return val;
  }

  parseFunctionStatement(node) {
    node.id = this.type !== tt.name ? null : this.parseIdent();
    this.parseFunctionParams(node);
    this.parseFunctionBody(node);
    return this.finishNode(node, 'FunctionDeclaration');
  }

  parseFunctionParams(node) {
    this.expect(tt.parenL);
    node.params = this.parseBindingList(tt.parenR, false);
  }

  parseFunctionBody(node) {
    node.body = this.parseBlock(undefined);
  }

  parseBlock(node = {}) {
    node.body = []; // 支持单行代码块

    const hasL = this.eat(tt.braceL);

    while (this.type && this.type !== tt.braceR) {
      const stmt = this.parseStatement();
      node.body.push(stmt);
      if (!hasL) break;
    }

    this.next();
    return this.finishNode(node, 'BlockStatement');
  }

  parseBindingList(close) {
    const elts = [];
    let first = true;

    while (!this.eat(close)) {
      if (first) first = false;else this.expect(tt.comma);
      const elem = this.parseMaybeDefault();
      elts.push(elem);
    }

    return elts;
  }

  parseExprList(close) {
    const elts = [];
    let first = true;

    while (!this.eat(close)) {
      if (!first) {
        this.expect(tt.comma);
      } else first = false;

      elts.push(this.parseMaybeAssign(false));
    }

    return elts;
  }

  parseMaybeDefault(left) {
    left = left || this.parseIdent();
    if (!this.eat(tt.eq)) return left;
    const node = {};
    node.left = left;
    node.right = this.parseMaybeAssign();
    return this.finishNode(node, 'AssignmentPattern');
  }

  parseBreakContinueStatement(node, keyword) {
    const isBreak = keyword === 'break';
    this.next();
    return this.finishNode(node, isBreak ? 'BreakStatement' : 'ContinueStatement');
  }

  next() {
    this.nextToken();
  }

  parseForStatement(node) {
    this.next();
    this.expect(tt.parenL);

    if (this.type === tt.semi) {
      return this.parseFor(node, null);
    }

    if ([tt._const, tt._var, tt._let].includes(this.type)) {
      const init = {
        kind: this.type
      };
      this.next();
      this.parseVar(init, true, init.kind);
      this.finishNode(init, 'VariableDeclaration');
      return this.parseFor(node, init);
    }

    const init = this.parseExpression(true);
    return this.parseFor(node, init);
  }

  isAssign() {
    return [tt.assign, tt.eq].includes(this.type);
  }

  raise(str) {
    throw new Error(str);
  }

  parseFor(node, init) {
    node.init = init;
    this.expect(tt.semi);
    node.test = this.type === tt.semi ? null : this.parseExpression();
    this.expect(tt.semi);
    node.update = this.type === tt.parenR ? null : this.parseExpression();
    this.expect(tt.parenR);
    this.parseBlock(node);
    return this.finishNode(node, 'ForStatement');
  }

  expect(type) {
    this.eat(type) || this.raise(`unsupport type${type}`);
  }

}

const _defineProperty = function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

const _typeof = obj => typeof obj;
/** 常用的polyfill 直接加入引擎 */


const babelPolyfill = {
  _defineProperty,
  typeof: _typeof
};

let anonymousId = 0;
const BREAK_SINGAL = {};
const CONTINUE_SINGAL = {};
const RETURN_SINGAL = {
  result: undefined
};
const illegalFun = [setTimeout, setInterval, clearInterval, clearTimeout];
const evaluate_map = {
  Program: (program, scope) => {
    for (const node of program.body) evaluate(node, scope);
  },
  Identifier: (node, scope) => {
    if (node.name === 'undefined') {
      return undefined;
    } // 奇怪的问题


    const $var = scope.$find(node.name);

    if ($var) {
      return $var.$get();
    }

    throw `[Error] 变量'${node.name}' 未定义`;
  },
  Literal: node => {
    return node.value;
  },
  BlockStatement: (block, scope) => {
    const new_scope = scope.invasived ? scope : new Scope('block', scope);

    for (const node of block.body) {
      const result = evaluate(node, new_scope);

      if (result === BREAK_SINGAL || result === CONTINUE_SINGAL || result === RETURN_SINGAL) {
        return result;
      }
    }
  },
  EmptyStatement: () => {},
  ExpressionStatement: (node, scope) => {
    evaluate(node.expression, scope);
  },
  ReturnStatement: (node, scope) => {
    RETURN_SINGAL.result = node.argument ? evaluate(node.argument, scope) : undefined;
    return RETURN_SINGAL;
  },
  BreakStatement: () => {
    return BREAK_SINGAL;
  },
  ContinueStatement: () => {
    return CONTINUE_SINGAL;
  },
  IfStatement: (node, scope) => {
    if (evaluate(node.test, scope)) return evaluate(node.consequent, scope);else if (node.alternate) return evaluate(node.alternate, scope);
  },
  ForStatement: (node, scope) => {
    for (const new_scope = new Scope('loop', scope), init_val = node.init ? evaluate(node.init, new_scope) : null; node.test ? evaluate(node.test, new_scope) : true; node.update ? evaluate(node.update, new_scope) : void 0) {
      const result = evaluate({
        type: 'BlockStatement',
        body: node.body
      }, new_scope);

      if (result === BREAK_SINGAL) {
        break;
      } else if (result === CONTINUE_SINGAL) {
        continue;
      } else if (result === RETURN_SINGAL) {
        return result;
      }
    }
  },
  FunctionDeclaration: (node, scope) => {
    const func = evaluate_map.FunctionExpression(node, scope);
    const {
      name: func_name
    } = node.id || {
      name: `anonymous${anonymousId++}`
    };

    if (!scope.$var(func_name, func)) {
      throw `[Error] ${func_name} 重复定义`;
    }

    return func;
  },
  VariableDeclaration: (node, scope) => {
    const {
      kind
    } = node;

    for (const declartor of node.declarations) {
      const {
        name
      } = declartor.id;
      const value = declartor.init ? evaluate(declartor.init, scope) : undefined;

      if (!scope.$declar(kind, name, value)) {
        throw `[Error] ${name} 重复定义`;
      }
    }
  },
  ThisExpression: (node, scope) => {
    const this_val = scope.$find('this');
    return this_val ? this_val.$get() : null;
  },
  ArrayExpression: (node, scope) => {
    return node.elements.map(item => evaluate(item, scope));
  },
  ObjectExpression: (node, scope) => {
    const object = {};

    for (const property of node.properties) {
      const {
        kind
      } = property;
      let key;

      if (property.key.type === 'Literal') {
        key = evaluate(property.key, scope);
      } else if (property.key.type === 'Identifier') {
        key = property.key.name;
      }

      const value = evaluate(property.value, scope);

      if (kind === 'init') {
        object[key] = value;
      } else if (kind === 'set') {
        Object.defineProperty(object, key, {
          set: value
        });
      } else if (kind === 'get') {
        Object.defineProperty(object, key, {
          get: value
        });
      }
    }

    return object;
  },
  FunctionExpression: (node, scope) => {
    function func(...args) {
      const new_scope = new Scope('function', scope);
      new_scope.invasived = true;

      for (let i = 0; i < node.params.length; i++) {
        const {
          name
        } = node.params[i];
        new_scope.$const(name, args[i]);
      }

      new_scope.$const('this', this);
      new_scope.$const('arguments', arguments);
      const result = evaluate(node.body, new_scope);

      if (result === RETURN_SINGAL) {
        return result.result;
      }
    }

    Object.defineProperty(func, "length", {
      value: node.params.length
    });
    return func;
  },
  UnaryExpression: (node, scope) => {
    return {
      '-': () => -evaluate(node.argument, scope),
      '+': () => +evaluate(node.argument, scope),
      '!': () => !evaluate(node.argument, scope),
      '~': () => ~evaluate(node.argument, scope),
      'void': () => void evaluate(node.argument, scope),
      'typeof': () => {
        if (node.argument.type === 'Identifier') {
          const $var = scope.$find(node.argument.name);
          return $var ? typeof $var.$get() : 'undefined';
        } else {
          return typeof evaluate(node.argument, scope);
        }
      },
      'delete': () => {
        if (node.argument.type === 'MemberExpression') {
          const {
            object,
            property,
            computed
          } = node.argument;

          if (computed) {
            return delete evaluate(object, scope)[evaluate(property, scope)];
          } else {
            return delete evaluate(object, scope)[property.name];
          }
        } else if (node.argument.type === 'Identifier') {
          const $this = scope.$find('this');
          if ($this) return $this.$get()[node.argument.name];
        }
      }
    }[node.operator]();
  },
  UpdateExpression: (node, scope) => {
    const {
      prefix
    } = node;
    let $var;

    if (node.argument.type === 'Identifier') {
      const {
        name
      } = node.argument;
      $var = scope.$find(name);
      if (!$var) throw `${name} 未定义`;
    } else if (node.argument.type === 'MemberExpression') {
      const {
        argument
      } = node;
      const object = evaluate(argument.object, scope);
      const property = argument.computed ? evaluate(argument.property, scope) : argument.property.name;
      $var = {
        $set(value) {
          object[property] = value;
          return true;
        },

        $get() {
          return object[property];
        }

      };
    }

    return {
      '--': v => ($var.$set(v - 1), prefix ? --v : v--),
      '++': v => ($var.$set(v + 1), prefix ? ++v : v++)
    }[node.operator](evaluate(node.argument, scope));
  },
  BinaryExpression: (node, scope) => {
    return {
      '==': (a, b) => a == b,
      '!=': (a, b) => a != b,
      '===': (a, b) => a === b,
      '!==': (a, b) => a !== b,
      '<': (a, b) => a < b,
      '<=': (a, b) => a <= b,
      '>': (a, b) => a > b,
      '>=': (a, b) => a >= b,
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
      '%': (a, b) => a % b,
      '|': (a, b) => a | b,
      '^': (a, b) => a ^ b,
      '&': (a, b) => a & b,
      in: (a, b) => a in b,
      instanceof: (a, b) => a instanceof b
    }[node.operator](evaluate(node.left, scope), evaluate(node.right, scope));
  },
  AssignmentExpression: (node, scope) => {
    let $var;

    if (node.left.type === 'Identifier') {
      const {
        name
      } = node.left;
      const $var_or_not = scope.$find(name);
      if (!$var_or_not) throw `${name} 未定义`;
      $var = $var_or_not;
    } else if (node.left.type === 'MemberExpression') {
      const {
        left
      } = node;
      const object = evaluate(left.object, scope);
      const property = left.computed ? evaluate(left.property, scope) : left.property.name;
      $var = {
        $set(value) {
          object[property] = value;
          return true;
        },

        $get() {
          return object[property];
        }

      };
    } else {
      throw '如果出现在这里，那就说明有问题了';
    }

    return {
      '=': v => ($var.$set(v), v),
      '+=': v => ($var.$set($var.$get() + v), $var.$get()),
      '-=': v => ($var.$set($var.$get() - v), $var.$get()),
      '*=': v => ($var.$set($var.$get() * v), $var.$get()),
      '/=': v => ($var.$set($var.$get() / v), $var.$get()),
      '%=': v => ($var.$set($var.$get() % v), $var.$get()),
      '|=': v => ($var.$set($var.$get() | v), $var.$get()),
      '^=': v => ($var.$set($var.$get() ^ v), $var.$get()),
      '&=': v => ($var.$set($var.$get() & v), $var.$get())
    }[node.operator](evaluate(node.right, scope));
  },
  LogicalExpression: (node, scope) => {
    return {
      '||': () => evaluate(node.left, scope) || evaluate(node.right, scope),
      '&&': () => evaluate(node.left, scope) && evaluate(node.right, scope)
    }[node.operator]();
  },
  MemberExpression: (node, scope) => {
    const {
      object,
      property,
      computed
    } = node;

    if (computed) {
      return evaluate(object, scope)[evaluate(property, scope)];
    }

    return evaluate(object, scope)[property.name];
  },
  ConditionalExpression: (node, scope) => {
    return evaluate(node.test, scope) ? evaluate(node.consequent, scope) : evaluate(node.alternate, scope);
  },
  CallExpression: (node, scope) => {
    let this_val = null;
    let func = null; // fix: ww().ww().ww()

    if (node.callee.type === 'MemberExpression') {
      const {
        object,
        property,
        computed
      } = node.callee;
      this_val = evaluate(object, scope);
      const funcName = !computed ? property.name : evaluate_map[property.type](property, scope);
      func = this_val[funcName];
      if (illegalFun.includes(func)) this_val = null;
    } else {
      this_val = scope.$find('this').$get();
      func = evaluate(node.callee, scope); // fix: setTimeout.apply({}, '');

      if (illegalFun.includes(func)) this_val = null;
    }

    return func.apply(this_val, node.arguments.map(arg => evaluate(arg, scope)));
  },
  NewExpression: (node, scope) => {
    const Func = evaluate(node.callee, scope);
    const args = node.arguments.map(arg => evaluate(arg, scope));
    return new Func(...args);
  },
  SequenceExpression: (node, scope) => {
    let last;

    for (const expr of node.expressions) {
      last = evaluate(expr, scope);
    }

    return last;
  },
  ThrowStatement: (node, scope) => {
    throw evaluate(node.argument, scope);
  },
  TryStatement: (node, scope) => {
    try {
      return evaluate(node.block, scope);
    } catch (err) {
      if (node.handler) {
        const param = node.handler.param;
        const new_scope = new Scope('block', scope);
        new_scope.invasived = true; // 标记为侵入式Scope，不用再多构造啦

        new_scope.$const(param.name, err);
        return evaluate(node.handler, new_scope);
      } else {
        throw err;
      }
    } finally {
      if (node.finalizer) return evaluate(node.finalizer, scope);
    }
  },
  CatchClause: (node, scope) => {
    return evaluate(node.body, scope);
  }
};

class ScopeVar {
  constructor(kind, value) {
    this.value = value;
    this.kind = kind;
  }

  $set(value) {
    if (this.value === 'const') {
      return false;
    }

    this.value = value;
    return true;
  }

  $get() {
    return this.value;
  }

}

class Scope {
  constructor(type, parent) {
    this.type = type;
    this.parent = parent || null;
    this.content = {};
    this.invasived = false;
    this.prefix = '';
  }

  $find(raw_name) {
    const name = this.prefix + raw_name;

    if (this.content.hasOwnProperty(name)) {
      return this.content[name];
    } else if (this.parent) {
      return this.parent.$find(raw_name);
    }

    return null;
  }

  $let(raw_name, value) {
    const name = this.prefix + raw_name;
    const $var = this.content[name];

    if (!$var) {
      this.content[name] = new ScopeVar('let', value);
      return true;
    }

    return false;
  }

  $const(raw_name, value) {
    const name = this.prefix + raw_name;
    const $var = this.content[name];

    if (!$var) {
      this.content[name] = new ScopeVar('const', value);
      return true;
    }

    return false;
  }

  $var(raw_name, value) {
    const name = this.prefix + raw_name;
    let scope = this;

    while (scope.parent !== null && scope.type !== 'function') {
      scope = scope.parent;
    }

    const $var = scope.content[name];

    if (!$var) {
      this.content[name] = new ScopeVar('var', value);
      return true;
    }

    return false;
  }

  $declar(kind, raw_name, value) {
    return {
      var: () => this.$var(raw_name, value),
      let: () => this.$let(raw_name, value),
      const: () => this.$const(raw_name, value)
    }[kind]();
  }

} // 记录每条语句的id


let traceId = 0; // 记录执行栈

const traceStack = []; // 正在执行的语句

let runingCode = '';

const findErrorCode = pos => {
  if (!pos) return runingCode;
  pos = pos < 0 ? -1 : pos;
  let headPos = pos;
  let endPos = pos;
  let headCount = 0;
  let endCount = 0;
  const endFlag = runingCode.length - 1;
  const res = [0, endFlag];

  while (!(headPos === -1 && endPos === endFlag)) {
    if (headPos !== -1) {
      // ; \r
      if ([59, 19].includes(runingCode[headPos].charCodeAt())) {
        if (headCount === 2) {
          res[0] = headPos + 1;
          headPos = -1;
        } else {
          headCount++;
          headPos++;
        }
      } else {
        headPos !== -1 && headPos--;
      }
    }

    if (endPos !== endFlag) {
      if ([59, 19].includes(runingCode[endPos].charCodeAt())) {
        if (endCount === 2) {
          res[1] = endPos;
          endPos = endFlag;
        } else {
          endCount++;
          endPos++;
        }
      } else {
        endPos++;
      }
    }
  }

  const errorCode = runingCode.slice(res[0], res[1]);
  const repeatNum = res[1] - res[0];
  return `${errorCode}\n${'^'.repeat(repeatNum > 40 ? 40 : repeatNum)}`;
};

const evaluate = (node, scope, arg) => {
  const thisId = traceId++;

  const error = err => {
    // console.log(err, thisId, traceId, traceStack)
    // 栈顶的id等于当前id，说明是当前语句
    if (traceStack[traceStack.length - 1] === thisId && err) {
      console.error(`[naruse-parser] 错误代码\n${findErrorCode(node.end - 3)}`);
      err && console.error('[naruse-parser] 错误信息', err);
      throw new Error('[naruse-parser] 代码执行错误！');
    }
  };

  traceStack.push(thisId);

  const _evalute = evaluate_map[node.type] || error();

  try {
    const res = _evalute(node, scope, arg);

    traceStack.pop();
    return res;
  } catch (e) {
    error(e);
  }
}; // 导出默认对象


const default_api = {
  console,
  setTimeout,
  setInterval,
  clearTimeout,
  clearInterval,
  encodeURI,
  encodeURIComponent,
  decodeURI,
  decodeURIComponent,
  Infinity,
  NaN,
  isFinite,
  isNaN,
  parseFloat,
  parseInt,
  Object,
  Boolean,
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  Number,
  Math,
  Date,
  String,
  RegExp,
  Array,
  JSON,
  Promise
};
Object.assign(default_api, babelPolyfill);
const run = (code, append_api = {}) => {
  runingCode = code;
  traceStack.length = 0;
  const scope = new Scope('block');
  scope.$const('this', undefined);

  for (const name of Object.getOwnPropertyNames(default_api)) {
    scope.$const(name, default_api[name]);
  }

  for (const name of Object.getOwnPropertyNames(append_api)) {
    scope.$const(name, append_api[name]);
  }

  const $exports = {};
  scope.$const('exports', $exports);
  const parser = new Parser(code);
  const node = parser.parse();
  evaluate(node, scope);
  return $exports;
};

const getOsInfo = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  let name = 'Unknown';
  let version = 'Unknown';

  if (userAgent.indexOf('win') > -1) {
    name = 'Windows';

    if (userAgent.indexOf('windows nt 5.0') > -1) {
      version = 'Windows 2000';
    } else if (userAgent.indexOf('windows nt 5.1') > -1 || userAgent.indexOf('windows nt 5.2') > -1) {
      version = 'Windows XP';
    } else if (userAgent.indexOf('windows nt 6.0') > -1) {
      version = 'Windows Vista';
    } else if (userAgent.indexOf('windows nt 6.1') > -1 || userAgent.indexOf('windows 7') > -1) {
      version = 'Windows 7';
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows 8') > -1) {
      version = 'Windows 8';
    } else if (userAgent.indexOf('windows nt 6.3') > -1) {
      version = 'Windows 8.1';
    } else if (userAgent.indexOf('windows nt 6.2') > -1 || userAgent.indexOf('windows nt 10.0') > -1) {
      version = 'Windows 10';
    } else {
      version = 'Unknown';
    }
  } else if (userAgent.indexOf('iphone') > -1) {
    name = 'iPhone';
  } else if (userAgent.indexOf('mac') > -1) {
    name = 'Mac';
  } else if (userAgent.indexOf('x11') > -1 || userAgent.indexOf('unix') > -1 || userAgent.indexOf('sunname') > -1 || userAgent.indexOf('bsd') > -1) {
    name = 'Unix';
  } else if (userAgent.indexOf('linux') > -1) {
    if (userAgent.indexOf('android') > -1) {
      name = 'Android';
    } else {
      name = 'Linux';
    }
  } else {
    name = 'Unknown';
  }

  return {
    name,
    version
  };
};
/**
 * @description 获取系统信息
 * @author CHC
 * @date 2022-03-30 19:03:25
 * @returns {*}
 */


const getSystemInfoSync = () => {
  return {
    app: 'NARUSE',
    brand: 'PC',
    currentBattery: '100%',
    fontSizeSetting: 16,
    language: 'Chinese',
    model: 'PC',
    pixelRatio: 1.5,
    platform: 'H5',
    screenHeight: window.screen.height,
    screenWidth: window.screen.width,
    statusBarHeight: 0,
    storage: null,
    system: getOsInfo().name,
    taojimuEnv: undefined,
    titleBarHeight: 0,
    version: '0.0.1',
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  };
};
/**
 * @description 异步获取系统信息
 * @author CHC
 * @date 2022-03-30 19:03:00
 * @param {*} [{ success, fail, complete }={}]
 * @returns {*}
 */

const getSystemInfo = ({
  success,
  fail,
  complete
} = {}) => {
  const handle = new MethodHandler({
    name: 'getStorageInfo',
    success,
    fail,
    complete
  });
  return handle.success(getSystemInfoSync());
};

var system = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getSystemInfoSync: getSystemInfoSync,
    getSystemInfo: getSystemInfo
});

/** 获取缓存 */

const getItem = function getItem(key) {
  let item;

  try {
    item = JSON.parse(localStorage.getItem(key) || '');
  } catch (e) {}

  if (item && typeof item === 'object' && Object.keys(item).includes('data')) {
    return {
      result: true,
      data: item.data
    };
  }

  return {
    result: false
  };
};
/** 同步设置缓存 */


const setStorageSync = (key, data = '') => {
  if (exceptTypeSync(key, 'string', 'removeStorageSync')) return;
  const type = typeof data;
  let obj = {};

  if (type === 'symbol') {
    obj = {
      data: ''
    };
  } else {
    obj = {
      data
    };
  }

  localStorage.setItem(key, JSON.stringify(obj));
};
/** 异步设置缓存 */

const setStorage = options => {
  let err;
  if (err = exceptType(options, 'object', 'setStorage')) return err;
  const {
    key,
    data,
    success,
    fail,
    complete
  } = options;
  const handle = new MethodHandler({
    name: 'setStorage',
    success,
    fail,
    complete
  });

  if (typeof key !== 'string') {
    return handle.fail({
      errMsg: 'setStorage:fail key must be string'
    });
  }

  setStorageSync(key, data);
  return handle.success();
};
/** 同步删除缓存 */

const removeStorageSync = key => {
  if (exceptTypeSync(key, 'string', 'removeStorageSync')) return;
  localStorage.removeItem(key);
};
/** 异步删除缓存 */

const removeStorage = options => {
  let err;
  if (err = exceptType(options, 'object', 'removeStorage')) return err;
  const {
    key,
    success,
    fail,
    complete
  } = options;
  const handle = new MethodHandler({
    name: 'removeStorage',
    success,
    fail,
    complete
  });

  if (typeof key !== 'string') {
    if (typeof key !== 'string') {
      logger.error('removeStorage:fail key must be string');
      return;
    }
  }

  removeStorageSync(key);
  return handle.success();
};
/** 同步获取缓存  */

const getStorageSync = key => {
  if (exceptTypeSync(key, 'string', 'getStorageSync')) return;
  const res = getItem(key);
  if (res.result) return res.data;
  return '';
};
/** 异步获取缓存  */

const getStorageInfoSync = () => {
  const res = {
    keys: Object.keys(localStorage),
    limitSize: NaN,
    currentSize: NaN
  };
  return res;
};
/** 获取缓存信息  */

const getStorageInfo = ({
  success,
  fail,
  complete
} = {}) => {
  const handle = new MethodHandler({
    name: 'getStorageInfo',
    success,
    fail,
    complete
  });
  return handle.success(getStorageInfoSync());
};
/** 同步获取缓存 */

const getStorage = options => {
  let err;
  if (err = exceptType(options, 'object', 'getStorage')) return err;
  const {
    key,
    success,
    fail,
    complete
  } = options;
  const handle = new MethodHandler({
    name: 'getStorage',
    success,
    fail,
    complete
  });

  if (typeof key !== 'string') {
    return handle.fail({
      errMsg: 'getStorage:fail key must be string'
    });
  }

  return handle.success({
    data: getStorageSync(key)
  });
};
/** 同步清除缓存 */

const clearStorageSync = () => {
  localStorage.clear();
};
/** 异步清除缓存 */

const clearStorage = ({
  success,
  fail,
  complete
} = {}) => {
  const handle = new MethodHandler({
    name: 'clearStorage',
    success,
    fail,
    complete
  });
  clearStorageSync();
  return handle.success();
};

var storage = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setStorageSync: setStorageSync,
    setStorage: setStorage,
    removeStorageSync: removeStorageSync,
    removeStorage: removeStorage,
    getStorageSync: getStorageSync,
    getStorageInfoSync: getStorageInfoSync,
    getStorageInfo: getStorageInfo,
    getStorage: getStorage,
    clearStorageSync: clearStorageSync,
    clearStorage: clearStorage
});

/**
 * @description 跳转到其他页面
 * @author CHC
 * @date 2022-03-30 18:03:08
 * @param {*} options
 * @returns {*}
 */

const navigateTo = options => {
  let err;
  if (err = exceptType(options, 'object', 'navigateTo')) return err;
  const {
    url,
    success,
    fail
  } = options;
  const handle = new MethodHandler({
    name: 'navigateTo',
    success,
    fail
  });

  if (typeof url !== 'string') {
    return handle.fail({
      errMsg: 'url'
    });
  }

  window.location.href = url;
  return handle.success();
};
/**
 * @description 打开外部页面
 * @author CHC
 * @date 2022-03-30 18:03:03
 * @param {*} options
 */

const navigateToWebPage = options => {
  let err;
  if (err = exceptType(options, 'object', 'navigateToWebPage')) return err;
  const {
    url,
    success,
    fail
  } = options;
  const handle = new MethodHandler({
    name: 'navigateToWebPage',
    success,
    fail
  });

  if (typeof url !== 'string') {
    return handle.fail({
      errMsg: 'url'
    });
  }

  window.open(url);
  return handle.success();
};
/**
 * @description 返回路由
 * @author CHC
 * @date 2022-03-30 18:03:18
 * @param {*} options
 * @returns {*}
 */

const navigateBack = (options = {}) => {
  let err;
  if (err = exceptType(options, 'object', 'navigateBack')) return err;
  const {
    delta = 1,
    success,
    fail
  } = options;
  const handle = new MethodHandler({
    name: 'navigateBack',
    success,
    fail
  });

  if (typeof delta !== 'number') {
    return handle.fail({
      errMsg: 'delta must a number'
    });
  }

  window.history.go(-Number(delta));
  return handle.success();
};

var route = /*#__PURE__*/Object.freeze({
    __proto__: null,
    navigateTo: navigateTo,
    navigateToWebPage: navigateToWebPage,
    navigateBack: navigateBack
});

/**
 * 剪贴板部分的api参考了Chameleon项目的实现：
 *
 * setClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/setClipBoardData
 * getClipboardData: https://github.com/chameleon-team/chameleon-api/tree/master/src/interfaces/getClipBoardData
 */
const CLIPBOARD_STORAGE_NAME = 'naruse_clipboard';
document.addEventListener('copy', () => {
  setStorage({
    key: CLIPBOARD_STORAGE_NAME,
    data: window.getSelection()?.toString()
  }).catch(e => {
    console.error(e);
  });
});
/**
  * 设置系统剪贴板的内容
  */

const setClipboardData = ({
  data,
  success,
  fail,
  complete
}) => {
  const handle = new MethodHandler({
    name: 'setClipboardData',
    success,
    fail,
    complete
  });

  try {
    setStorageSync(CLIPBOARD_STORAGE_NAME, data);
    /**
    * 已于 iPhone 6s Plus iOS 13.1.3 上的 Safari 测试通过
    * iOS < 10 的系统可能无法使用编程方式访问剪贴板，参考：
    * https://stackoverflow.com/questions/34045777/copy-to-clipboard-using-javascript-in-ios/34046084
    */

    if (typeof document.execCommand === 'function') {
      const textarea = document.createElement('textarea');
      textarea.readOnly = true;
      textarea.value = data;
      textarea.style.position = 'absolute';
      textarea.style.width = '100px';
      textarea.style.left = '-10000px';
      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } else if (typeof window.copy === 'function') {
      window.copy(data);
    } else {
      throw new Error('Unsupported Function');
    }

    return handle.success();
  } catch (e) {
    return handle.fail({
      errMsg: e.message
    });
  }
};
/**
  * 获取系统剪贴板的内容
  */

const getClipboardData = ({
  success,
  fail,
  complete
} = {}) => {
  const handle = new MethodHandler({
    name: 'getClipboardData',
    success,
    fail,
    complete
  });

  try {
    const data = getStorageSync(CLIPBOARD_STORAGE_NAME);
    return handle.success({
      data
    });
  } catch (e) {
    return handle.fail({
      errMsg: e.message
    });
  }
};

var device$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setClipboardData: setClipboardData,
    getClipboardData: getClipboardData
});

var device = { ...device$1
};

const api = { ...system,
  ...storage,
  ...route,
  ...device
};

const version = '0.0.5';
const Naruse = { ...api,
  Component,
  createElement: naruseCreateElement,
  env: {
    USER_DATA_PATH: '',
    clientName: 'H5',
    clientVersion: version,
    language: 'zh-Hans',
    platform: 'H5'
  },
  getDeferred,
  globalEvent,
  EventBus,
  version,
  unsafe_run: run
};

if (typeof window !== 'undefined') {
  window.Naruse = Naruse;
}

const _config = {
  hotPuller: () => {
    logger.error('未初始化热更新拉取，无法更新组件默认为空');
    return Promise.resolve({
      code: '',
      ctx: {}
    });
  },
  baseCtx: () => {
    return {};
  },
  onRunError: err => {
    console.error(err);
  }
};
/**
 * @description 获取初始化
 * @author CHC
 * @date 2022-06-14 10:06:50
 * @returns {{ _config: () => Promise<{ code, ctx }>  }} 
 */

const getNaruseConfig = () => {
  return _config;
};
/**
 * @description naruse内部初始化过程
 * @author CHC
 * @date 2022-06-14 10:06:36
 */


const naruseInit = ({
  hotPuller,
  baseCtx,
  onRunError
} = {}) => {
  if (hotPuller) _config.hotPuller = hotPuller;
  if (baseCtx) _config.baseCtx = baseCtx;
  if (onRunError) _config.onRunError = onRunError;
};

/**
 * @description 根据props获取naruse组件
 * @author CHC
 * @date 2022-06-14 10:06:49
 */

const getNaruseComponentFromProps = async props => {
  if (!props || typeof props !== 'object') {
    logger.error('无效参数，无法生成对应naruse组件');
    return;
  }

  const {
    hotPuller
  } = getNaruseConfig();

  try {
    const {
      code,
      ctx
    } = await hotPuller(props);
    return getNaruseComponentFromCode(code, ctx);
  } catch (e) {
    logger.error('加载远程代码资源失败', e);
  }
};
/**
 * @description 从代码和运行环境内获取对应组件
 * @author CHC
 * @date 2022-06-14 16:06:40
 */

const getNaruseComponentFromCode = async (code, ctx) => {
  if (!code) return null;
  const {
    baseCtx: _baseCtx,
    onRunError
  } = getNaruseConfig();
  const baseCtx = typeof _baseCtx === 'function' ? _baseCtx() : _baseCtx; // 导出变量

  let exports = {};

  try {
    exports = run(code, {
      h: Naruse.createElement,
      Naruse,
      ...baseCtx,
      ...ctx
    });
  } catch (err) {
    logger.error('运行时出错，自动继续', err);
    onRunError(err);
    return;
  }

  let component = null; // 默认导出组件存在

  if (exports.default) {
    component = exports.default;
  } else {
    const NaruseComponent = Naruse.Component; // 兼容老版组件

    const compatibleClass = function compatibleClass(...args) {
      const self = this;
      NaruseComponent.apply(this, args);
      exports.constructor && exports.constructor.call(this);
      Object.entries(exports).forEach(([key, value]) => {
        if (key === 'constructor') return;
        self[key] = typeof value === 'function' ? value.bind(self) : value;
      });
    };

    compatibleClass.prototype = Object.create(NaruseComponent.prototype);
    Object.assign(compatibleClass.prototype, {
      constructor: compatibleClass
    });
    component = compatibleClass;
  }

  return component;
};
/**
 * @description 热更新容器组件
 * @author CHC
 * @date 2022-07-19 18:07:44
 * @class Container
 * @extends {Component<{}, {loaded: boolean}>}
 */

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    this.init(props);
  }

  async init(props) {
    this.Component = await getNaruseComponentFromProps(props);

    if (this.Component) {
      this.setState({
        loaded: true
      });
    }
  }

  render() {
    return this.state.loaded ? Naruse.createElement(this.Component) : null;
  }

}

export { Container, Naruse, Container as default, naruseInit };
