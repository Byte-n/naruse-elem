
function baseEventProps (e: Event) {
    return {
        type: e.type,
        /** 阻止冒泡 */
        stopPropagation() {
            e.stopPropagation();
        },
        // 真正触发事件的元素
        target: e.target,
        // 当前元素（冒泡）
        currentTarget: e.currentTarget,
    }
}

const reflectEventMap = {
    /** 点击事件处理 */
    click(e) {
        return {
            ...baseEventProps(e),
            type: 'click',
            detail: {
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
            },
        };
    },
    /** 加载完毕 */
    load(e) {
        return {
            ...baseEventProps(e),
            type: 'load',
            detail: {
                width: e.target.width,
                height: e.target.height,
            },
        };
    },
    /** 聚焦 */
    focus(e) {
        return {
            ...baseEventProps(e),
            type: 'foucs',
            detail: { value: e.target.value },
        };
    },
    /** 失焦 */
    blur(e) {
        return {
            ...baseEventProps(e),
            type: 'blur',
            detail: { value: e.target.value },
        };
    },
    /** 按键 */
    keydown(e) {
        const { value } = e.target;
        const keyCode = e.keyCode || e.code;
        return {
            ...baseEventProps(e),
            type: 'keydown',
            detail: {
                value,
                cursor: value.length,
                keyCode,
            },
        };
    },
    /** 输入 */
    input(e) {
        return {
            ...baseEventProps(e),
            type: 'input',
            detail: e.detail,
        };
    },
    /** 动效结束 */
    transitionend  (e) {
        return {
            ...baseEventProps(e),
            type: 'transitionEnd',
            detail: {
                elapsedTime: e.elapsedTime,
                propertyName: e.propertyName,
            }
        };
    },
    mouseup (e) {
        return {
            ...this.click(e),
            type:'mouseUp'
        };
    },
    mousedown (e) {
        return {
            ...this.click(e),
            type:'mouseDown'
        }
    },
    touchend (e) {
        return commonTouchEventCreater(e);
    },
    touchmove (e) {
        return commonTouchEventCreater(e);
    },
    touchstart (e) {
        return commonTouchEventCreater(e);
    },
    change (e, data) {
        if (!data) {
            data = {
                detail:{
                    value: e.target.value
                }
            }
        }
        return {
            ...baseEventProps(e),
            ...data
        }
    },
    changing (e, data) {
        return {
            ...baseEventProps(e),
            ...data
        }
    },
};

/** 事件名称对应处理名称 */
const reflectEventNameMap = {
    click: 'onClick',
    load: 'onLoad',
    focus: 'onFocus',
    blur: 'onBlur',
    keydown: 'onKeyDown',
    input: 'onInput',
    transitionend : 'onTransitionEnd',
    mousedown: 'onMouseDown',
    mouseup: 'onMouseUp',
    touchstart:"onTouchStart",
    touchmove:"onTouchMove",
    touchend:"onTouchEnd",
    change:"onChange",
    changing:"onChanging"
};


/**
 * @description 通用事件处理
 * @author CHC
 * @date 2022-03-18 16:03:45
 * @param {React.SyntheticEvent} e
 */
export const commonEventHander = function (e, data: { type: string, detail: object } | null = null) {
    const type = data ? data.type: e.type;
    const key = reflectEventNameMap[type];
    const handler = this.props[key];
    if (!handler || typeof handler !== 'function') return;
    const event = reflectEventMap[type];
    const res = reflectEventMap[type](e, data);
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
export const commonMouseEventCreater = (event) => {
    const { altKey, ctrlKey, shiftKey, clientX, clientY, pageX, pageY, screenX, screenY, stopPropagation, type, nativeEvent, target, currentTarget } = event;
    return {
        type,
        detail: {
            altKey, ctrlKey, shiftKey, clientX, clientY, pageX, pageY, screenX, screenY,
        },
        stopPropagation,
        timeStamp: new Date().getTime(),
        // 真正触发事件的元素
        target,
        // 当前元素（冒泡）
        currentTarget
    }
}
/**
 * 创建一个 TouchEvent 对象
 * @param event{React.TouchEvent<T, TouchEvent>}
 */
export const commonTouchEventCreater = (event) => {
    const { type, changedTouches, targetTouches, touches, detail, target, stopPropagation } = event;
    return {
        ...baseEventProps(event),
        type,
        // 涉及当前(引发)事件的触摸点的列表
        changedTouches,
        // 当前对象上所有触摸点的列表;
        targetTouches,
        // 当前屏幕上所有触摸点的列表;
        touches,
        detail, // 此值是一个数值，可能会有用
        // 真正触发事件的元素
        target,
        stopPropagation
    }
}
