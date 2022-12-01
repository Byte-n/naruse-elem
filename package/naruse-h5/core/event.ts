
const reflectEventMap = {
    /** 点击事件处理 */
    click(e) {
        return {
            type: 'click',
            detail: {
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
            },
            /** 阻止冒泡 */
            stopPropagation() {
                e.stopPropagation();
            },
        };
    },
    /** 加载完毕 */
    load(e) {
        return {
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
            type: 'foucs',
            detail: { value: e.target.value },
        };
    },
    /** 失焦 */
    blur(e) {
        return {
            type: 'blur',
            detail: { value: e.target.value },
        };
    },
    /** 按键 */
    keydown(e) {
        e.stopPropagation();
        const { value } = e.target;
        const keyCode = e.keyCode || e.code;
        return {
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
            type: 'input',
            detail: e.detail,
        };
    },
    /** 动效结束 */
    transitionend  (e) {
        return {
            type: 'transitionEnd',
            detail: {
                elapsedTime: e.elapsedTime,
                propertyName: e.propertyName,
            },
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
    input: 'onInput',
    transitionend : 'onTransitionEnd',
};


/**
 * @description 通用事件处理
 * @author CHC
 * @date 2022-03-18 16:03:45
 * @param {React.SyntheticEvent} e
 */
export const commonEventHander = function (e) {
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
export const commonMouseEventCreater = (event) => {
    const { altKey, ctrlKey, shiftKey, clientX, clientY, pageX, pageY, screenX, screenY, stopPropagation, type } = event;
    return {
        type,
        detail: {
            altKey, ctrlKey, shiftKey, clientX, clientY, pageX, pageY, screenX, screenY,
        },
        stopPropagation,
        timeStamp: new Date().getTime(),
    }
}
