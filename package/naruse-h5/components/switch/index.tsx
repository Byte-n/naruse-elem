import React, { Component } from "react";
import { getBaseProps } from "../../utils";
import { commonEventHander } from "core/event";
import style from "./index.css";

interface SwitchProps {
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    color?: string;
    controls?: boolean;
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
        const { disabled, onChange } = this.props;
        if (disabled) return;
        const { checked } = e.target;
        onChange && commonEventHander.call(this, e);
        this.setState({ checked });
    };

    render() {
        const {
            disabled = false,
            color = "#ff5000",
            controls = false,
        } = this.props;
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
                <input
                    style={style.input}
                    type="checkbox"
                    checked={checked}
                    onChange={this.onChange}
                    aria-controls={controls}
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
