(() => {
    var e = {
            342: (e, t, o) => {
                "use strict";
                o.r(t), o.d(t, {
                    changeDomTreeById: () => c,
                    clickEventBus: () => a,
                    getPathById: () => i,
                    getVnodeById: () => s,
                    initVnodeTree: () => d,
                    testVnode: () => p
                });
                const r = ["text"],
                    n = console.log,
                    i = function (e, t) {
                        const o = [];
                        if (t.id === e) return o;
                        if (t.childNodes && t.childNodes.length) {
                            for (let r = 0; r < t.childNodes.length; r++)
                                if (t.childNodes[r].id === e) return o.push(r), o;
                            for (let r = 0; r < t.childNodes.length; r++) {
                                const n = i(e, t.childNodes[r]);
                                if (n) {
                                    o.push(r);
                                    for (let e = 0; e < n.length; e++) o.push(n[e]);
                                    return o
                                }
                            }
                        }
                    },
                    s = function (e, t) {
                        const o = i(e, t);
                        if (!o) return;
                        if (!o.length) return t;
                        let r = t;
                        return o.forEach((e => {
                            r = r.childNodes[e]
                        })), r
                    },
                    c = function (e, t, o) {
                        const r = s(e, o);
                        if (r) {
                            n("caro-更新元素", JSON.parse(JSON.stringify(r)), JSON.parse(JSON.stringify(t)));
                            const o = {};
                            Object.assign(o, r.style), Object.assign(o, t.style), Object.assign(r, t), r.style = o, r.id = e, d(r)
                        }
                        return o
                    },
                    d = function (e, t, o) {
                        const r = e;
                        return r.id || (r.id = (e => {
                            let t = Date.now().toString(36);
                            return t += Math.random().toString(36).slice(2, 16), t
                        })()), r.parentId = o, r.isDynamicText && (r.childNodes = function (e, t) {
                            return e && t[e] ? t[e] : e
                        }(r.childNodes, t)), Array.isArray(r.childNodes) && r.childNodes.forEach((e => d(e, t, r.id))), r
                    },
                    a = function (e, t, o) {
                        let i = t;
                        if (!(e && e.target && e.target.id)) return t;
                        const d = s(e.target.id, i);
                        if (!d) return t;
                        const {
                            onClick: p
                        } = d;
                        return p ? (p.forEach((t => {
                            n(`caro-触发事件-${"popup" === e.type ? "冒泡" : "原生"}-${t.type}-${t.targetId}`, t.props), "changeDom" === t.type ? i = c(t.targetId, t.props, i) : o && Object.keys(o).forEach((e => {
                                e === t.type && o[e](t.props)
                            }))
                        })), r.includes(d.type) && a({
                            target: {
                                id: d.parentId
                            },
                            type: "popup"
                        }, t), i) : i
                    },
                    p = {
                        type: "view",
                        childNodes: [{
                            type: "image",
                            src: "/trade/web/images/caro/testModal/特权.png",
                            childNodes: []
                        }]
                    }
            }
        },
        t = {};

    function o(r) {
        var n = t[r];
        if (void 0 !== n) return n.exports;
        var i = t[r] = {
            exports: {}
        };
        return e[r](i, i.exports, o), i.exports
    }
    o.d = (e, t) => {
        for (var r in t) o.o(t, r) && !o.o(e, r) && Object.defineProperty(e, r, {
            enumerable: !0,
            get: t[r]
        })
    }, o.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), o.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        const {
            initVnodeTree: e,
            clickEventBus: t
        } = o(342);
        Component({
            mixins: [],
            data: {
                item: {}
            },
            props: {
                render: {},
                customEvents: {},
                environments: {}
            },
            didMount() {
                const t = e(this.props.render, this.props.environments);
                this.setData({
                    item: t
                }, (() => {
                    console.log("caro-log-自定义组件装载成功", this.props)
                }))
            },
            methods: {
                onClick(e) {
                    const o = t(e, this.data.item, this.$page.$component.customEvents);
                    this.setData({
                        item: o
                    })
                }
            }
        })
    })()
})();