import React, { Component } from "react";
import { getBaseProps } from "../../utils";
import { commonEventHander } from "core/event";
import Checkbox from "components/checkbox";
import style from "./index.css";

interface SwitchProps {
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    color?: string;
    onChange?: Function;
}

interface SwitchState {
    checked: boolean;
}

const h = React.createElement;
class Switch extends Component<SwitchProps, SwitchState> {
    /**
     * @description 开关元素
     * @type {HTMLElement}
     */
    switchEl;
    /**
     * @description 滑块元素
     * @type {HTMLElement}
     */
    sliderEl;
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        };
    }

    /**
     * @description 初始化
     */
    componentDidMount() {
        const { checked } = this.props;
        this.setState({ checked });
    }

    /**
     * @description 更新
     * @param e {SwitchProps}
     */
    onChange = (e) => {
        e.stopPropagation();
        const { onChange } = this.props;
        const { checked } = e.target;
        const data = {
            type: "change",
            detail: {
                value: checked,
            },
        };
        onChange && commonEventHander.call(this, e, data);
        this.setState({ checked });
    };

    render() {
        const { disabled = false, color = "#ff5000" } = this.props;
        const { checked = false } = this.state;
        return (
            <label
                ref={(el) => (this.switchEl = el)}
                style={{
                    ...style.switch,
                    background: checked ? color : "#fff",
                }}
                {...getBaseProps(this.props)}
            >
                <Checkbox
                    disabled={disabled}
                    style={style.input}
                    checked={checked}
                    onChange={this.onChange}
                />
                <span
                    ref={(el) => (this.sliderEl = el)}
                    style={{
                        ...style.slider,
                        transform: `translateX(${checked ? 22 : 0}px)`,
                        boxShadow: checked ? "" : "2px 2px 3px #c2c2c2",
                    }}
                />
                {disabled && <span style={style.switchMask} />}
            </label>
        );
    }
}

export default Switch;
