import React, { Component, createElement } from 'react';
import run from 'naruse-parser';
import { createLogger, MethodHandler, exceptTypeSync, exceptType, version } from 'naruse-share';

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
      onMouseEnter: this.onTouchStart.bind(this),
      onMouseLeave: this.onTouchEnd.bind(this),
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
      return naruseCreateElement('view', null, '不支持的组件类型');
    }

    return createElement(Component, props, ...children);
  }

  if (type.prototype instanceof Component) {
    return createElement(type, props, ...children);
  }

  if (typeof type === 'function') {
    props.children = children;
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

const Naruse = { ...api,
  Component,
  env: {
    USER_DATA_PATH: '',
    clientName: 'H5',
    clientVersion: '0.0.1',
    language: 'zh-Hans',
    platform: 'H5'
  },
  version
};

if (typeof window !== 'undefined') {
  window.Naruse = Naruse;
}

const jsEngineEnv = {
  h: naruseCreateElement,
  Naruse,
  my: Naruse
};

/**
 * @description 根据代码动态的加载组件，使用前请确定代码已经加载完毕
 * @author CHC
 * @date 2022-03-17 19:03:51
 * @export
 * @class ReactMiddleware
 * @extends {Component}
 */

class ReactMiddleware extends Component {
  constructor(props) {
    super(props);
    const exports = run(props.code, { ...(props.env || {}),
      ...jsEngineEnv
    });

    if (!exports.default) {
      // 兼容老版组件
      const compatibleClass = function compatibleClass(...args) {
        const self = this;
        Component.apply(this, args);
        exports.constructor.call(this);
        Object.entries(exports).forEach(([key, value]) => {
          if (key === 'constructor') return;
          self[key] = typeof value === 'function' ? value.bind(self) : value;
        });
      };

      compatibleClass.prototype = Object.create(Component.prototype);
      Object.assign(compatibleClass.prototype, {
        constructor: compatibleClass
      });
      this.compilerComponent = compatibleClass;
    } else {
      this.compilerComponent = exports.default;
    }
  }

  render() {
    return React.createElement(this.compilerComponent, null);
  }

}

export { ReactMiddleware as default };
