import { renderComponentOnPageWithCode } from '../../../../package/naruse-alipay/build/lib'

const testCode = `
console.log('啦啦啦');
function o() {}

o.prototype = Object.create(Naruse.Component.prototype);

Object.assign(o.prototype, {
    componentDidMount: function() {},
    render: function() {
        return h("view", {
            style: {
                display: "flex",
                flexDirection: "column"
            }
        }, "123", h("button", {
            onClick: function() {
                Naruse.navigateTo({
                    url: "/pages/my/my"
                });
            }
        }, "新的！"));
    },
    constructor: o
});

exports.default = o;`


Page({
  data: {},
  onLoad(query) {
    console.log('page onLoad', query)
  },
  qwer() {
    my.navigateTo({ url: '/pages/qwer/qwer' })
  },
  gotoIndex() {
    renderComponentOnPageWithCode('pages/my/my', testCode)
  }
})