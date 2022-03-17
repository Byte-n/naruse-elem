import { Component } from 'react';

/** 是否是支持的type */
const getTrueType = function getTrueType (type, confirmType, password) {
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
const fixControlledValue = function fixControlledValue (value) {
    return value ?? '';
};

class Input extends Component {
    constructor () {
        super();
        this.inputRef = null;
        this.isOnComposition = false;
        this.onInputExcuted = false;
        this.state = { _value: '' };
    }

    componentDidMount () {
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

        this.props.autoFocus && this.inputRef?.focus();
    }


    /** 输入 */
    handleInput (e) {
        e.stopPropagation();
        const {
            type,
            maxlength,
            confirmType,
            password,
        } = this.props;
        if (!this.isOnComposition && !this.onInputExcuted) {
            let { value } = e.target;
            const inputType = getTrueType(type, confirmType, password);
            this.onInputExcuted = true;
            if (inputType === 'number' && value && maxlength <= value.length) {
                value = value.substring(0, maxlength);
                e.target.value = value;
            }
            this._value = value;
            this.props.onChange && this.props.onChange({
                value,
                cursor: value.length,
            });
        }
    }

    /** 聚焦 */
    handleFocus (e) {
        this.onInputExcuted = false;
        this.props.onFocus && this.props.onFocus({ value: e.target.value });
    }

    /** 脱焦 */
    handleBlur (e) {
        this.props.onBlur && this.props.onBlur({ value: e.target.value });
    }

    /** 改变 */
    handleChange (e) {
        this.onInputExcuted = false;
        this.props.onChange && this.props.onChange({ value: e.target.value });
    }

    /** 按下 */
    handleKeyDown (e) {
        const { value } = e.target;
        const keyCode = e.keyCode || e.code;
        this.onInputExcuted = false;
        e.stopPropagation();

        this.props.onKeyDown && this.props.onKeyDown({
            value,
            cursor: value.length,
            keyCode,
        });
        keyCode === 13 && this.props.onConfirm && this.props.onConfirm({ value });
    }

    render () {
        const {
            _value,
            type,
            password,
            placeholder,
            disabled,
            maxlength,
            confirmType,
            name,
            className,
            ...nativeProps
        } = this.props;

        return (
            <input
                ref={input => {
                    this.inputRef = input;
                }}
                class={className}
                value={fixControlledValue(_value)}
                type={getTrueType(type, confirmType, password)}
                placeholder={placeholder}
                disabled={disabled}
                maxlength={maxlength}
                name={name}
                onInput={this.handleInput}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                {...nativeProps}
            />
        );
    }
}


export default Input;