import { Component } from 'Naruse';

import _style from './index.css';
/**
 * @description 关闭按钮
 * @author D
 * @date 2022-04-18 16:30:02
 * @export
 * @class CloseButton
 * @extends {Component<{ onClose: ()=> void;text: string }>}
 */

export default class CloseButton extends Component {
    constructor () {
        super();
    }
    render () {
        const { onClose, text, style = {} }  = this.props;
        return <text onClick={onClose}  style={{ ..._style.closeButton, ...style }} hoverStyle={_style.hoverStyle}>
            {text || '关闭'}
        </text>;
    }
}