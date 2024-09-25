import React, { Component } from "react";
import { getBaseProps } from "../../utils";
import { commonEventHander } from "core/event";
interface CheckboxProps {
    /** id */
    id?: string | number;
    /** 是否选中 */
    checked?: boolean;
    /** 名称 */
    name?: string;
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
    /** 其他样式 */
    style: object;
}

interface CheckboxStates {}

const h = React.createElement;
class Checkbox extends Component<CheckboxProps, CheckboxStates> {

    render() {
        const { id, checked, value, disabled, children, onChange, ...style } = this.props;
        return (
            <label
                style={{ ...style }}
                htmlFor={id}
                {...getBaseProps(this.props, "label")}
            >
                <input
                    {...getBaseProps(this.props)}
                    type="checkbox"
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={onChange}
                />
                {children}
            </label>
        );
    }
}

export default Checkbox;
