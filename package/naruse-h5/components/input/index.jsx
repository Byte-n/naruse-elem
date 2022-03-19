import { commonEventHander } from '../../core/event';
import { Component } from 'react';

/** 是否是支持的type */
const getTrueType = function getTrueType(type, confirmType, password) {
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
const fixControlledValue = function fixControlledValue(value) {
    return value ?? '';
};

class Input extends Component {
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
                this._value = value;
            },
            configurable: true,
        });

        this.props.focus && this.inputRef?.focus();
    }


    /** 输入 */
    handleInput(e) {
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
    handleKeyDown = (e) => {
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
            ...nativeProps
        } = this.props;

        return (
            <input
                ref={input => {
                    this.inputRef = input;
                }}
                className={className}
                value={fixControlledValue(value)}
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
            />
        );
    }
}


export default Input;