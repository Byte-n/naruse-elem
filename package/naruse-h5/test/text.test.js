import React from 'react'
import * as assert from 'assert'
import { Naruse } from '../dist/index'
import { mount } from './utils'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = Naruse.createElement

describe('text 组件', () => {
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
    const wrapper = await mount(<text />, scratch)
    const { node } = wrapper
    const computedStyle = window.getComputedStyle(node)

    assert(computedStyle.userSelect === 'none')

    await wrapper.setProps({
      selectable: true,
    })

    assert(computedStyle.userSelect === 'text')

    await wrapper.setProps({
      id: 'naruse',
    })

    assert(node.id === 'naruse')

  })

  it('子组件', async () => {
    const { node } = await mount(<text>文字传入ok</text>, scratch)

    assert(node.textContent === '文字传入ok')
  })
})
