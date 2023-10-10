import { commonEventHander } from '../../core/event';
import React, { Component } from 'react';
import { getPropsDataSet } from '../../utils';

const h = React.createElement;

/** 是否是支持的type */
const getTrueType = function getTrueType(type: string, confirmType: string, password: any) {
    if (confirmType === 'search') type = 'search';
    if (password) type = 'password';
    if (typeof type === 'undefined') {
        return 'text';
    }
    if (!type) {
        throw new Error('unexpected type');
    }
    if (type === 'digit') type = 'number';

    return type;
};

/** 修复可控值 */
const fixControlledValue = function fixControlledValue(value: any) {
    return value ?? '';
};

class Input extends Component {
    inputRef: null;
    isOnComposition: boolean;
    onInputExcuted: boolean;
    el: {};
    state: { _value: string; };
    props: any;
    fileListener: (e: any) => void;
    _value: any;
    constructor() {
        super();
        this.inputRef = null;
        this.isOnComposition = false;
        this.onInputExcuted = false;
        this.el = {};
        this.state = { _value: '' };
    }

    componentDidMount() {
        if (this.props.type === 'file') {
            this.fileListener = (e) => {
                this.props.onInput && this.props.onInput(e);
            };
            this.inputRef?.addEventListener('change', this.fileListener);
        }

        Object.defineProperty(this.el, 'value', {
            get: () => this.inputRef?.value,
            set: value => {
                this.setState({
                    _value: value,
                })
            },
            configurable: true,
        });
        setTimeout(() => this.props.focus && this.inputRef?.focus());
    }

    /** 输入 */
    handleInput(e: { stopPropagation: () => void; target: { value: any; }; }) {
        e.stopPropagation();
        const {
            type,
            maxlength,
            confirmType,
            password,
        } = this.props;
        let { value } = e.target;
        const inputType = getTrueType(type, confirmType, password);
        if (inputType === 'number' && value && maxlength <= value.length) {
            value = value.substring(0, maxlength);
            e.target.value = value;
        }
        this._value = value;
        this.setState({ _value: value });
        commonEventHander.call(this, {
            type: 'input', detail: {
                value,
                cursor: value.length,
            }
        })
    }

    /** 聚焦 */
    handleFocus = commonEventHander.bind(this);

    /** 脱焦 */
    handleBlur = commonEventHander.bind(this);

    /** 改变 */
    handleChange = commonEventHander.bind(this);

    /** 按下 */
    handleKeyDown = (e: { target: { value: any; }; keyCode: any; code: any; }) => {
        const { value } = e.target;
        const keyCode = e.keyCode || e.code;
        commonEventHander.call(this, e);
        keyCode === 13 && this.props.onConfirm && this.props.onConfirm({ value });
    };

    render() {
        const {
            type,
            password,
            placeholder,
            disabled,
            maxlength,
            confirmType,
            name,
            className,
            value,
            controlled,
            ...other
        } = this.props;

        const { _value } = this.state;

        return (
            <input
                ref={(input: null) => {
                    this.inputRef = input;
                }}
                className={className}
                // 受控则只使用外部值，非受控优先使用外部值
                value={fixControlledValue(controlled ? value : (value ?? _value))}
                type={getTrueType(type, confirmType, password)}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxlength}
                name={name}
                onInput={this.handleInput.bind(this)}
                onFocus={this.handleFocus.bind(this)}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
                {...getPropsDataSet(other)}
            />
        );
    }
}


export default Input;
