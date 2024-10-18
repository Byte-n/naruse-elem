import React, { Component } from 'react';
import { commonEventHander } from '../../core/event';
import { getBaseProps } from '../../utils';

const h = React.createElement;

/** 单选框组 */
export default class RadioGroup extends Component<{
    name?: string,
    onChange?: Function,
    style: object,
    id: string,
    className: string
}, {}> {

    state = { value: null };
    setRef = (ref: null) => this.ref = ref;

    componentDidMount () {
        let { children } = this.props;
        children = children.filter(val => typeof val === 'object' && val);
        const value = ( children.find(val => val.props.checked)?.props.value ) || children[0].props.value;
        this.setState({ value });
    }

    onChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
        const data = {
            type: 'change',
            detail:{
                value,
            }
        }
        commonEventHander.call(this, e, data);
    };

    render () {
        const {
            children, name
        } = this.props;
        return (
            <span {...getBaseProps(this.props)} ref={this.setRef}>
                {
                    children.map(val => {
                        if (typeof val != 'object' || !val) {
                            return val;
                        }
                        return {
                            ...val,
                            props: {
                                ...val.props,
                                name,
                                onChange: this.onChange,
                                checked: val.props.value === this.state.value,
                            },
                        }
                    })
                }
            </span>
        );
    }
}
