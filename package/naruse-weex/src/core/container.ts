// 容器组件，用于解决
// 1. 样式继承的问题 ✅
// 2. z-index的问题 ✅
// 3. 必须写完整，如background:#000需要写成background-color:#000 ✅
// 4. 自动转换rpx ✅
// 5. 不支持view滚动 
// 6. 事件冒泡 ✅
// 7. 不支持百分比 

import { Component, RaxNode } from 'rax';



class Container extends Component {
    transformChildren () {
        console.log(this.props.children)
        return 123;
    }


    render(): RaxNode {
        this.transformChildren();
        return null;
    }
}

export { Container };