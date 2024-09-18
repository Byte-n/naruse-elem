import React,{ Component } from 'react';
import { getBaseProps, getPropsDataSet } from '../../utils';
import { commonEventHander } from 'core/event';

interface CheckboxProps {
    /** key */
    key?: string | number
    /** id */
    id?: string | number;
    /** 是否选中 */
    checked?: boolean;
    /** 名称 */
    name?: string;
    /** 颜色 */
    color?: string;
    /** 值 */
    value: string | number;
    /** 标签 */
    label: string | number;
    /** 子元素 */
    children?: any;
    /** 是否禁用 */
    disabled?: boolean;
    /** 改变事件 */
    onChange?: Function;
}

interface CheckboxStates {

}

const h = React.createElement;
class Checkbox extends Component<CheckboxProps, CheckboxStates> {
    // /** 改变事件 */
    // handleChange (e) {
    //     const { onChange } = this.props;
    //     e.stopPropagation();
    //     onChange && onChange({ value: this.value });
    // }
    onChange = commonEventHander.bind(this);
    setRef = (ref: null) => this.ref = ref;

    render () {
        const { id, key, checked, name, color, value, label, disabled, children, ...nativeProps } = this.props;

        return (
            <label key={key}
                htmlFor={id}
                {...getBaseProps(this.props, 'label')}>
                <view style={{background: '409eff'}}>
                    <input
                        ref={this.setRef}
                        type='checkbox'
                        value={value}
                        style={{ opacity:1, color }}
                        checked={checked}
                        disabled={disabled}
                        onChange={this.onChange}
                        {...getPropsDataSet(nativeProps)}
                    />
                </view>
                {children ? <view>{children}</view> : (label ? label : value)}
            </label>
        );
    }
}

export default Checkbox;
