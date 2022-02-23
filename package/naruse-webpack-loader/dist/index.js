var __webpack_exports__ = {};
function _newArrowCheck() {}

exports.constructor = function () {
  this.state = {
    qwe: 1,
    ww: 2
  };
};

exports.componentDidMount = function () {
  console.log('我出来啦！');
};

exports.componentDidUpdate = function () {
  console.log('我自由啦');
};

exports.render = function () {
  var _this = this;

  const qwe = this.state.qwe;
  return h("view", null, h("view", null, qwe), h("button", {
    onClick: function (e) {
      _newArrowCheck(this, _this);

      console.log(e);
      this.setState({
        qwe: qwe++
      });
    }.bind(this)
  }, "修改"), h("input", {
    onChange: function (e) {
      _newArrowCheck(this, _this);

      this.setState({
        qwe: e.detail.value
      });
    }.bind(this)
  }));
};
