import { Component } from 'Naruse';
import { NOOP } from '@utils/common';

const buyBtnHoverStyle = { backgroundColor: 'white', color: '#666666'  }

const closeStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '15rpx 50rpx',
    border: '2px solid #FFF',
    borderRadius: '50rpx',
    cursor: 'pointer',
    marginTop:'40rpx'
};

/**
 * @desc 关闭按钮
 * @author gao01
 * @param {function} dialogClose 关闭按钮被点击时
 * @param {string} closeBtnName 关闭按钮文本 默认'关闭'
 * @date 2022/04/28 10:38:04
 */
export default class CloseButton extends Component {
    constructor () {
    }

    render () {
        const { closeBtnName = '关闭', dialogClose = NOOP} = this.props
        return <view style={closeStyle} hoverStyle={buyBtnHoverStyle} onClick={dialogClose} > {closeBtnName} </view>
    }
}
