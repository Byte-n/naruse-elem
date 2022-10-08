import React from 'react'
import * as assert from 'assert'
import { Naruse } from '../dist/index'
import { delay, mount } from './utils'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = Naruse.createElement


describe('textarea 组件', () => {
  /**
   * @type {HTMLElement}
   */
  let scratch

  beforeEach(() => {
    scratch = document.createElement('div')
    document.body.appendChild(scratch)
  })

  afterEach(() => {
    scratch.parentNode.removeChild(scratch)
    scratch = null
  })

  it('props 是否正常运行', async () => {
    const textareaStyle = { width: '300px', height: '120px' };
    let isInput = false;
    const wrapper = await mount(<textarea style={textareaStyle} placeholder='这里是输入提示' value={'初始值'} disabled={true} onInput={() => {isInput = true;}} />, scratch)
    const { node } = wrapper
    const computedStyle = window.getComputedStyle(node)

    assert(wrapper.component.props.style === textareaStyle)
    assert(wrapper.component.props.placeholder === '这里是输入提示')
    assert(wrapper.component.props.value === '初始值')
    assert(wrapper.component.props.disabled === true)

    await wrapper.setProps({
      placeholder: '这里是修改后的输入提示',
      value: '修改后的初始值',
      disabled: false,
    })
    assert(wrapper.component.props.placeholder === '这里是修改后的输入提示')
    assert(wrapper.component.props.value === '修改后的初始值')
    assert(wrapper.component.props.disabled === false)

    wrapper.component.textareaRef.value = '键盘模拟输入~'
    node.dispatchEvent(new Event('input', { bubbles: true}))
    assert(wrapper.component.textareaRef.value === '键盘模拟输入~')
    assert(isInput === true)
  })
})
