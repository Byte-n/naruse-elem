const speicalConfig = {
    // 基础属性
    baseAttributes: {
        'style': 'style',
        'id': 'id',
        'class': 'className',
    },
    // 会冒泡的事件
    bubblingEvents: [
        'onTap',
        'onLongTap',
        'onTouchStart',
        'onTouchMove',
        'onTouchEnd',
        'onTouchCancel',
        'onTransitionEnd',
        'onAnimationStart',
        'onAnimationIteration',
        'onAnimationEnd',
    ],
}

// 基础元素事件
const baseElementEvents = [
    'onTap',
    'onLongTap',
    'onTouchStart',
    'onTouchMove',
    'onTouchEnd',
    'onTouchCancel',
    'onTransitionEnd',
]

const view = {
    templateName: 'view',
    reflectTagName: 'view',
    attributes: [
        'disable-scroll',
        'hover-class',
        'hover-start-time',
        'hover-stay-time',
        'animation',
        'hover-stop-propagation',
        'hidden',
    ],
    events: [
        ...baseElementEvents,
        'onAppear',
        'onDisappear',
        'onFirstAppear',
    ],
    nest: true,
}

const webView = {
    templateName: 'web-view',
    reflectTagName: 'web-view',
    attributes: [
        'disable-scroll',
        'hover-class',
        'hover-start-time',
        'hover-stay-time',
        'animation',
        'hover-stop-propagation',
        'hidden',
        'src',
    ],
    events: [
        ...baseElementEvents,
        'onAppear',
        'onDisappear',
        'onFirstAppear',
        'onMessage',
        'onLoad',
        'onError',
    ],
}

const scrollView = {
    templateName: 'scroll-view',
    reflectTagName: 'scroll-view',
    attributes: [
        'scroll-x',
        'scroll-y',
        'upper-threshold',
        'lower-threshold',
        'scroll-top',
        'scroll-left',
        'scroll-into-view',
        'scroll-with-animation',
        'scroll-animation-duration',
        'enable-back-to-top',
        'trap-scroll',
        'animation',
    ],
    events: [
        'onScrollToUpper',
        'onScrollToLower',
        'onScroll',
        ...baseElementEvents,
    ],
    nest: true,
}

/**
 * 单选组
 */
const radioGroup = {
    templateName: 'radio-group',
    reflectTagName: 'radio-group',
    attributes: [
        'name',
    ],
    events: [
        'onChange',
        ...baseElementEvents,
    ],
    nest: true,
}

/**
 * 原生 单选
 */
export const nativeRadio = {
    templateName: 'native-radio',
    reflectTagName: 'radio',
    attributes: [
        'value',
        'checked',
        'disabled',
        'color',
    ],
    events: [
        ...baseElementEvents,
    ],
}

/**
 * 复选框组
 */
const checkboxGroup = {
    templateName: 'checkbox-group',
    reflectTagName: 'checkbox-group',
    attributes: [
        'name',
    ],
    events: [
        'onChange',
        ...baseElementEvents,
    ],
    nest: true,
}

/**
 * 原生 复选框
 */
export const nativeCheckbox = {
    templateName: 'native-checkbox',
    reflectTagName: 'checkbox',
    attributes: [
        'value',
        'checked',
        'disabled',
        'color',
    ],
    events: [
        'onChange',
        ...baseElementEvents,
    ],
}

/**
 * 单选开关
 */
export const nativeSwitch = {
    templateName: 'switch',
    reflectTagName: 'switch',
    attributes: [
        'name',
        'checked',
        'disabled',
        'color',
        'controlled',
    ],
    events: [
        'onChange',
        ...baseElementEvents,
    ],
}

/**
 * 滑动选择器
 */
export const slider = {
    templateName: 'slider',
    reflectTagName: 'slider',
    attributes: [
        'name',
        'min',
        'max',
        'step',
        'disabled',
        'value',
        'show-value',
        'active-color',
        'background-color',
        'track-size',
        'handle-size',
        'handle-color',
    ],
    events: [
        'onChange',
        'onChanging',
        ...baseElementEvents,
    ],
}

const text = {
    templateName: 'text',
    reflectTagName: 'text',
    attributes: [
        'selectable',
        'space',
        'decode',
        'number-of-lines',
        'animation',
    ],
    events: [
        ...baseElementEvents
    ],
    children: '{{content}}',
}

const image = {
    templateName: 'image',
    reflectTagName: 'image',
    attributes: [
        'src',
        'mode',
        'lazy-load',
        'animation',
    ],
    events: [
        'onLoad',
        'onError',
        ...baseElementEvents,
    ]
}

const video = {
    templateName: 'video',
    reflectTagName: 'video',
    attributes: [
        'src',
        'poster',
        'object-fit',
        'initial-time',
        'controls',
        'autoplay',
        'direction',
        'loop',
        'muted',
        'show-fullscreen-btn',
        'show-mute-btn',
        'mobilenetHintType',
    ],
    events: [
        'onPlay',
        'onPause',
        'onEnded',
        'onTimeUpdate',
        'onFullScreenChange',
        'onLoading',
        'onError',
    ]
}

const button = {
    templateName: 'button',
    reflectTagName: 'button',
    attributes: [
        'size',
        'type',
        'plain',
        'disabled',
        'loading',
        'form-type',
        'animation',
    ],
    events: [
        ...baseElementEvents,
    ],
    nest: true,
}

const baseInputEvents = [
    'onInput',
    'onFocus',
    'onBlur',
    'onConfirm',
]

const input = {
    templateName: 'input',
    reflectTagName: 'input',
    attributes: [
        'value',
        'type',
        'password',
        'placeholder',
        'placeholder-style',
        'placeholder-class',
        'disabled',
        'maxlength',
        'cursor-spacing',
        'auto-focus',
        'focus',
        'confirm-type',
        'confirm-hold',
        'controlled',
        'cursor',
        'randomNumber',
        'animation',
    ],
    events: [
        ...baseInputEvents,
    ]
}

const textarea = {
    templateName: 'textarea',
    reflectTagName: 'textarea',
    attributes: [
        'value',
        'placeholder',
        'placeholder-style',
        'placeholder-class',
        'disabled',
        'maxlength',
        'auto-focus',
        'focus',
        'auto-height',
        'fixed',
        'show-count',
        'controlled',
        'animation',
    ],
    events: [
        ...baseInputEvents,
    ]
}

// 纯净版 view 用于减少代码冗余
const pureView = {
    templateName: 'pv',
    reflectTagName: 'view',
    attributes: [],
    events: [],
    nest: true,
}

// 纯净版文本，用于增强性能
const pureText = {
    templateName: 'pt',
    reflectTagName: 'text',
    attributes: [],
    events: [],
    nest: true,
    children: '{{content}}',
}


const templateList = [
    view,
    scrollView,
    text,
    image,
    video,
    button,
    input,
    textarea,
    pureView,
    pureText,
    webView,
    nativeRadio,
    radioGroup,
    checkboxGroup,
    nativeCheckbox,
    nativeSwitch,
    slider,
]


const eventCenterEventName = 'ec';

export {
    templateList,
    speicalConfig,
    eventCenterEventName
}

