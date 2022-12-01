const speicalConfig = {
    events: {
        // 'onTap': 'onClick',
        // 'onLongTap': 'onLongClick',
    },
    attributes: {
        'class': 'className',
    },
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
        // 'onAppear',
        // 'onDisappear',
        // 'onFirstAppear',
    ],
    nest: true,
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
        'trap-scroll'
    ],
    events: [
        'onScrollToUpper',
        'onScrollToLower',
        'onScroll',
        ...baseElementEvents,
    ],
    nest: true,
}

const text = {
    templateName: 'text',
    reflectTagName: 'text',
    attributes: [
        'selectable',
        'space',
        'decode',
        'number-of-lines',
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
        'objectFit',
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
    ],
    events: [
        ...baseInputEvents,
    ]
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
]

module.exports = {
    templateList,
    speicalConfig,
}