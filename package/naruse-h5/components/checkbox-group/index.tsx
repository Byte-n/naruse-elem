import React, { Component } from "react";
import { getBaseProps } from "../../utils";

const h = React.createElement;

/** 复选框组 */
export default class CheckBoxGroup extends Component<
    {
        name?: string;
        onChange?: Function;
        style: object;
    },
    {
        selectValue: Array<string | number>;
    }
> {
    state = { selectValue: [] };
    setRef = (ref: null) => (this.ref = ref);

    componentDidMount() {
        let { children } = this.props;
        children = children.filter((val) => typeof val === "object" && val);
        const selectValue = children
            .filter((el) => el.props.checked)
            .map((el) => el.props?.value);
        this.setState({ selectValue });
    }

    onChange = (e) => {
        // e.stopPropagation();
        const { onChange } = this.props;
        const { selectValue } = this.state;
        const { checked, value } = e.target;
        const changeSelectValue = checked
            ? [...selectValue, value]
            : selectValue.filter((item) => item !== value);
        this.setState({ selectValue: changeSelectValue });
        onChange && onChange({ ...e, detail: { value: changeSelectValue } });
    };

    render() {
        const { children, name } = this.props;
        const { selectValue } = this.state;
        return (
            <span ref={this.setRef} {...getBaseProps(this.props)}>
                {children.map((val) => {
                    if (typeof val != "object" || !val) {
                        return val;
                    }
                    return {
                        ...val,
                        props: {
                            ...val.props,
                            name,
                            onChange: this.onChange,
                            checked: selectValue.some(
                                (item) => item === val.props.value
                            ),
                        },
                    };
                })}
            </span>
        );
    }
}
