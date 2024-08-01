import React, { Component } from 'react';
import { commonEventHander } from '../../core/event';
import { getBaseProps } from '../../utils';

const h = React.createElement;

/** 单选框 */
export default class Radio extends Component<{
    value?: string,
    checked?: boolean,
    disabled?: boolean,
    color?: string,
    name?: string,
    onChange?: Function
}, {}> {
    ref: null;
    onChange = commonEventHander.bind(this);
    setRef = (ref: null) => this.ref = ref;

    render () {
        const { value, checked, disabled, id, children } = this.props;
        return (
            <label
                htmlFor={id}
                {...getBaseProps(this.props, 'label')}
            >
                <input
                    {...getBaseProps(this.props)}
                    ref={this.setRef}
                    type="radio"
                    value={value}
                    checked={checked}
                    onChange={this.onChange}
                    disabled={disabled}
                />
                {children}
            </label>
        )
    }
}
