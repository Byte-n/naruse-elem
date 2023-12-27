const mitt = function (n = new Map()) {
    return {
        all: n = n || new Map,
        on: function (e, t) {
            var i = n.get(e);
            i ? i.push(t) : n.set(e, [t])
            return () => {
                this.off(e, t);
            };
        },
        off: function (e, t) {
            var i = n.get(e);
            i && (t ? i.splice(i.indexOf(t) >>> 0, 1) : n.set(e, []))
        },
        emit: function (e, ...t) {
            var i = n.get(e);
            i && i.slice().map(function (n) {
                n(...t)
            }), (i = n.get("*")) && i.slice().map(function (n) {
                typeof n === 'function' && n(e, ...t)
            })
        },
        once: function (event, fun) {
            var i = n.get(event);
            const funcs = (...args) => {
                fun(...args);
                var i = n.get(event);
                i && i.splice(i.indexOf(funcs) >>> 0, 1);
            }
            i ? i.push(funcs) : n.set(event, [funcs])
        },
        clear: function () {
            n.clear();
        }
    }
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

export {
    globalEvent,
    EventBus,
    mitt,
};
