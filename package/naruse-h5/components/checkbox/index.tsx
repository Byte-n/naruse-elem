import React,{ Component } from 'react';

const h = React.createElement;
class Checkbox extends Component {
    /** 改变事件 */
    handleChange (e) {
        e.stopPropagation();
        this.props.onChange && this.props.onChange({ value: this.value });
    }

    render () {
        const { checked, name, color, value, disabled, ...nativeProps } = this.props;

        return (
            <input
                ref={dom => {
                    if (!dom) return;
                    this.inputEl = dom;
                    if (this.id) dom.setAttribute('id', this.id);
                }}
                type='checkbox'
                value={value}
                name={name}
                style={{ color }}
                checked={checked}
                disabled={disabled}
                onChange={this.handleChange.bind(this)}
                {...nativeProps}
            />
        );
    }
}

export default Checkbox;
