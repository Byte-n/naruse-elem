// eslint-disable-next-line @typescript-eslint/no-unused-vars
import cssStyle from './index.css';
import React from 'react';

const h = React.createElement;

export interface TaroEvent<T extends EventTarget, D = any> extends Event {
    srcElement: T | null
    target: T
    detail: D
}

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string
    value?: string
    placeholder?: string
    placeholderStyle?: string
    disabled: boolean
    maxlength?: number
    focus?: boolean
    autoHeight?: boolean
    showCount?: boolean
    controlled?: boolean
    onInput: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void
    onFocus: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void
    onBlur: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void
    onConfirm: (e: React.SyntheticEvent<HTMLDivElement, Event>) => void
}

const scrollBar = document.createElement('style');
scrollBar.type = 'text/css';
scrollBar.id = '_theOnlytextarea';
scrollBar.innerHTML = `
    .taroTextareaCore {
        &:focus {
            outline: none;
          }
    }
    .taroTextareaCore::-webkit-scrollbar {
        display: none
    }
`;
const head = document.getElementsByTagName('head').item(0);
if (!document.getElementById('_theOnlytextarea')) {
    head.append(scrollBar);
}

export default class Textarea extends React.Component<IProps> {
    textareaRef: any = null;
    el: any = null;
    value: any = '';
    line: any = 1;
    static defaultProps: { disabled: boolean; maxlength: number; readonly: boolean; focus: boolean; autoHeight: boolean; showCount: boolean; controlled: boolean; };

    componentDidMount() {
        const { value = '' } = this.props;
        if (value != '') {
            this.textareaRef.value = value;
        }
    }

    handleLineChange = () => {
        const line = this.getNumberOfLines()
        if (line !== this.line) {
            this.line = line;
            this.textareaRef.rows = line
        }
    }

    getNumberOfLines = () => {
        const ta = this.textareaRef,
            style = window.getComputedStyle ? window.getComputedStyle(ta) : ta.style,
            // This will get the line-height only if it is set in the css,
            // otherwise it's "normal"
            taLineHeight = parseInt(style.lineHeight, 10),
            // Get the scroll height of the textarea
            taHeight = this.calculateContentHeight(ta, taLineHeight),
            // calculate the number of lines
            numberOfLines = Math.ceil(taHeight / taLineHeight)

        return numberOfLines
    }

    calculateContentHeight = (ta, scanAmount) => {
        let cta = getComputedStyle(ta);
        let origHeight = ta.style.height,
            height = ta.offsetHeight,
            scrollHeight = parseFloat(cta.height),
            overflow = ta.style.overflow,
            originMinHeight = ta.style.minHeight || null;
        
        // scrollHeight -= paddingAll;

        /// only bother if the ta is bigger than content
        if (height >= scrollHeight) {
            ta.style.minHeight = 0
            /// check that our browser supports changing dimension
            /// calculations mid-way through a function call...
            ta.style.height = height + scanAmount + 'px'
            /// because the scrollbar can cause calculation problems
            ta.style.overflow = 'hidden'
            /// by checking that scrollHeight has updated
            if (scrollHeight < ta.scrollHeight) {
                /// now try and scan the ta's height downwards
                /// until scrollHeight becomes larger than height
                while (ta.offsetHeight >= ta.scrollHeight) {
                    ta.style.height = (height -= scanAmount) + 'px'
                }
                /// be more specific to get the exact height
                while (ta.offsetHeight < ta.scrollHeight) {
                    ta.style.height = height++ + 'px'
                }
                /// reset the ta back to it's original height
                ta.style.height = origHeight
                /// put the overflow back
                ta.style.overflow = overflow
                ta.style.minHeight = originMinHeight
                return height
            }
        } else {
            return scrollHeight
        }
    }

    render() {
        const {
            style,
            placeholder,
            disabled,
            maxLength,
            autoFocus,
            autoHeight,
            name,
            nativeProps,
            onInput,
            onFocus,
            onBlur,
            onConfirm
        } = this.props;

        const otherProps: {
            [props: string]: any
        } = {}

        if (autoHeight) {
            otherProps.rows = this.line
            cssStyle.taroTextarea.height = 'auto';
        }

        const _onInput = (e) => {
            const { value } = this.textareaRef;
            const event = {
                type: 'input', detail: {
                    value,
                    cursor: value.length,
                }, timestamp: new Date().getTime()
            };
            onInput && onInput(event);
            if (autoHeight) this.handleLineChange();
        }

        const _onFocus = (e) => {
            const { value } = this.textareaRef;
            const event = {
                type: 'focus', detail: {
                    value,
                    cursor: value.length,
                }, timestamp: new Date().getTime()
            };
            onFocus && onFocus(event);
        }

        const _onBlur = (e) => {
            const { value } = this.textareaRef;
            const event = {
                type: 'blur', detail: {
                    value,
                    cursor: value.length,
                }, timestamp: new Date().getTime()
            };
            onBlur && onBlur(event);
        }

        const _onConfirm = (e) => {
            if (e.keyCode === 13) {
                const { value } = this.textareaRef;
                const event = {
                    type: 'confirm', detail: {
                        value,
                        cursor: value.length,
                    }, timestamp: new Date().getTime()
                };
                onConfirm && onConfirm(event);
            }

        }

        return (
            <textarea
                ref={input => {
                    if (input) {
                        this.textareaRef = input
                    }
                }}
                style={{ ...style, ...cssStyle.taroTextarea }}
                className={'taroTextareaCore'}
                placeholder={placeholder}
                name={name}
                disabled={!!disabled}
                maxLength={maxLength}
                autoFocus={autoFocus}
                onInput={_onInput}
                onFocus={_onFocus}
                onBlur={_onBlur}
                onKeyUp={_onConfirm}
                {...nativeProps}
                {...otherProps}
            />
        )
    }
}

Textarea.defaultProps = {
    disabled: false,
    maxlength: 140,
    readonly: false,
    focus: false,
    autoHeight: false,
    showCount: true,
    controlled: false,
}