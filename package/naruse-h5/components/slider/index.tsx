import React, { Component } from "react";
import { getBaseProps } from "../../utils";
import { commonEventHander } from "core/event";
import style from "./index.css";

interface SliderProps {
    name?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    value?: number;
    showValue?: boolean;
    activeColor?: string;
    backgroundColor?: string;
    trackSize?: number;
    handleSize?: number;
    handleColor?: string;
    onChanging?: Function;
    onChange?: Function;
}

interface SliderStates {
    value: number;
}

const h = React.createElement;
class Slider extends Component<SliderProps, SliderStates> {
    /**
     * @description 进度条元素
     * @type {HTMLElement}
     */
    sliderProgressBarEl;
    /**
     * @description 滑块元素
     * @type {HTMLElement}
     */
    sliderThumbEl;
    /**
     * @description 滑块容器
     * @type {HTMLElement}
     */
    sliderContainerEl;
    /**
     * @description 数值元素
     * @type {HTMLElement}
     */
    valueDisplayEl;
    constructor(props) {
        super(props);

        let currentValue = 0;
        const { value = 0, min = 0, max = 100 } = this.props;
        if (value < min || value > max) {
            currentValue = value > max ? max : min;
        } else {
            currentValue = value;
        }

        this.state = {
            value: currentValue,
            mouseClientX: 0,
            isDragging: false,
        };
    }

    onMouseLeave = (e) => {
        e.stopPropagation();
        const { isDragging } = this.state;
        isDragging && this.onMouseUp(e);
    };

    /**
     * 鼠标按下
     * @param e
     */
    onMouseDown = (e) => {
        e.stopPropagation();
        this.setState({
            mouseClientX: e.clientX,
            isDragging: true,
        });
        this.sliderThumbEl.addEventListener("mousemove", this.onMouseMove);
        this.sliderThumbEl.addEventListener("mouseup", this.onMouseUp);
        this.startDragStyle();
    };

    /**
     * 鼠标移动
     * @param e
     */
    onMouseMove = (e) => {
        e.stopPropagation();
        const {
            min = 0,
            max = 100,
            step = 1,
            handleSize = 18,
            onChanging,
        } = this.props;
        const { mouseClientX, value } = this.state;
        const { width } = this.sliderContainerEl.getBoundingClientRect();
        // 计算x偏移量
        const diffValue = e.clientX - mouseClientX;
        // 计算当前值
        let currentValue =
            Math.round((diffValue / width) * (max - min)) + value;
        if (currentValue <= min) currentValue = min;
        if (currentValue >= max) currentValue = max;

        const left = `calc(${((currentValue - min) / (max - min)) * 100}% - ${
            handleSize / 2
        }px)`;
        if (step <= 0) return;
        if (currentValue % step === 0) {
            this.sliderProgressBarEl.style.width = `calc(${
                ((currentValue - min) / (max - min)) * 100
            }%)`;
            this.sliderThumbEl.style.left = left;
            this.valueDisplayEl.textContent = currentValue;
            const data = {
                type: "changing",
                detail: { value: currentValue },
            };
            onChanging && commonEventHander.call(this, e, data);
        }
    };

    /**
     * 释放鼠标
     * @param e
     */
    onMouseUp = (e) => {
        e.stopPropagation();
        const { onChange } = this.props;
        const currentValue = Number(this.valueDisplayEl.textContent);
        this.endDragStyle();
        this.setState({
            value: currentValue,
            isDragging: false,
        });
        const data = {
            type: "change",
            detail: { value: currentValue },
        };
        onChange && commonEventHander.call(this, e, data);
        // 移除事件
        this.sliderThumbEl.removeEventListener("mousemove", this.onMouseMove);
        this.sliderThumbEl.removeEventListener("mouseup", this.onMouseUp);
    };

    /**
     * 拖拽滑块元素开始样式
     * @returns
     */
    startDragStyle = () => {
        const { handleColor } = this.props;
        if (!handleColor) {
            this.sliderThumbEl.style.backgroundColor = "#ff5000";
        }
    };

    /**
     * 拖拽滑块元素结束样式
     * @returns
     */
    endDragStyle = () => {
        const { handleColor } = this.props;
        if (!handleColor) {
            this.sliderThumbEl.style.backgroundColor = "#fff";
        }
    };

    /**
     * 点击跳转到指定位置
     * @returns
     */
    setSliderValue = (e) => {
        const { isDragging } = this.state;
        if (isDragging) return;
        const { min = 0, max = 100, onChange } = this.props;
        const { left, width } = e.target.getBoundingClientRect();
        const offsetX = e.clientX - left; // 鼠标相对于滑动条的水平偏移
        const percentage = offsetX / width; // 计算百分比
        const newValue = Math.round(percentage * (max - min) + min); // 转换为数值
        this.setState({ value: newValue });
        const data = {
            type: "change",
            detail: { value: newValue },
        };
        onChange && commonEventHander.call(this, e, data);
    };

    render() {
        const { value } = this.state;
        const {
            min = 0,
            max = 100,
            step = 1,
            disabled = false,
            showValue = false,
            activeColor = "#ff5000",
            backgroundColor = "#ddd",
            handleColor = "#fff",
            handleSize = 18,
            trackSize = 2,
        } = this.props;

        if (step < 0) {
            console.error("step must be greater than 0");
            return;
        }
        if (min > max) {
            console.error("min must be less than max");
            return;
        }
        if (handleSize < 0) {
            console.error("handleSize must be greater than 0");
            return;
        }
        if (trackSize < 0) {
            console.error("trackSize must be greater than 0");
            return;
        }

        return (
            <div
                style={style.slider}
                onMouseLeave={this.onMouseLeave}
                {...getBaseProps(this.props)}
            >
                <div
                    ref={(self) => (this.sliderContainerEl = self)}
                    style={{
                        ...style.sliderContainer,
                        backgroundColor: backgroundColor,
                        height: trackSize,
                    }}
                    onMouseUp={this.setSliderValue}
                >
                    <div
                        ref={(self) => (this.sliderProgressBarEl = self)}
                        style={{
                            ...style.slideActiveValue,
                            backgroundColor: activeColor,
                            height: trackSize,
                            width: `calc(${
                                ((value - min) / (max - min)) * 100
                            }%)`,
                        }}
                    />
                    <div
                        ref={(self) => (this.sliderThumbEl = self)}
                        style={{
                            ...style.sliderThumb,
                            backgroundColor: handleColor,
                            borderColor: activeColor,
                            width: handleSize,
                            height: handleSize,
                            top: `calc(50% - ${2 + handleSize / 2}px)`,
                            left: `calc(${
                                ((value - min) / (max - min)) * 100
                            }% - ${handleSize / 2}px)`,
                        }}
                        onMouseDown={this.onMouseDown}
                    />
                </div>
                <div
                    ref={(self) => (this.valueDisplayEl = self)}
                    style={{
                        ...style.valueDisplay,
                        width: showValue ? "30px" : 0,
                        marginLeft: showValue ? "8px" : 0,
                        opacity: showValue ? 1 : 0,
                    }}
                >
                    {value}
                </div>
                {disabled && <div style={style.sliderMask} />}
            </div>
        );
    }
}

export default Slider;
