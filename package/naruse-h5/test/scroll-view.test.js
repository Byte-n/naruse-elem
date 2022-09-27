import React from 'react'
import * as assert from 'assert'
import { Naruse } from '../dist/index'
import { delay, mount } from './utils'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = Naruse.createElement

describe('scroll-view 组件', () => {
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
    const scrollStyle = { width: '400px', height: '400px' };
    const wrapper = await mount(<scroll-view style={scrollStyle}>
      <image id='firstImg' style={{ height: '4681px', width: '750px' }} src='//q.aiyongtech.com/ad/images/6auY57qn54mILTI%3D_1663677524622.png'/>
      <image id='lastImg' style={{ height: '6012px', width: '750px' }} src='//q.aiyongtech.com/ad/images/5LiT5Lia54mILTI%3D_1663838345708.png'/>
    </scroll-view>, scratch)
    const { node } = wrapper
    const computedStyle = window.getComputedStyle(node)

    assert(wrapper.component.props.style === scrollStyle)
    assert(wrapper.component.props.scrollX === false)
    assert(wrapper.component.props.scrollY === false)
    assert(wrapper.component.props.scrollWithAnimation === false)
    assert(wrapper.component.props.upperThreshold === 50)
    assert(wrapper.component.props.lowerThreshold === 50)

    await wrapper.setProps({
      scrollX: true,
      scrollY: true,
      scrollWithAnimation: true,
      upperThreshold: 100,
      lowerThreshold: 100,
    })

    assert(wrapper.component.props.scrollX === true)
    assert(wrapper.component.props.scrollY === true)
    assert(wrapper.component.props.scrollWithAnimation === true)
    assert(wrapper.component.props.upperThreshold === 100)
    assert(wrapper.component.props.lowerThreshold === 100)

  })

  it('竖向滚动触发事件', async () => {
    const scrollStyle = { width: '400px', height: '400px' };
    const test1 = { one: false, two: false };
    const wrapper = await mount(<scroll-view style={scrollStyle} scrollWithAnimation={true} scrollY={true} scrollTop={40} upperThreshold={20} lowerThreshold={800} onScrollToUpper={() => {test1.one = true;}}  onScrollToLower={() => {test1.two = true;}} onScroll={(res) => {}}>
      <image id='firstImg' style={{ height: '4681px', width: '750px' }} src='//q.aiyongtech.com/ad/images/6auY57qn54mILTI%3D_1663677524622.png'/>
      <image id='lastImg' style={{ height: '6012px', width: '750px' }} src='//q.aiyongtech.com/ad/images/5LiT5Lia54mILTI%3D_1663838345708.png'/>
    </scroll-view>, scratch)
    const { node } = wrapper
    await delay(3000);
    assert(node.scrollTop === 40)

    // 没设置触发事件高度
    node.scrollTop = 10000;
    await delay(500);
    assert(test1.two === true)
    node.scrollTop = 10;
    await delay(500);
    assert(test1.one === true)

    await wrapper.setProps({
      upperThreshold: 100,
      lowerThreshold: 200,
    })

    test1.one = false;
    test1.two = false;

    node.scrollTop = 10700;
    await delay(500);
    assert(test1.two === true)
    node.scrollTop = 70;
    await delay(500);
    assert(test1.one === true)

  })

  it('横向滚动触发事件', async () => {
    const scrollStyle = { width: '400px', height: '400px' };
    const test2 = { one: false, two: false };
    const wrapper = await mount(<scroll-view style={scrollStyle} scrollWithAnimation={true} scrollX={true} scrollLeft={100} upperThreshold={80} lowerThreshold={80} onScrollToUpper={() => {test2.one = true;}}  onScrollToLower={() => {test2.two = true;}} onScroll={(res) => {console.log('横向滚动事件！', res.detail)}}>
      <image id='firstImg' style={{ height: '4681px', width: '750px' }} src='//q.aiyongtech.com/ad/images/6auY57qn54mILTI%3D_1663677524622.png'/>
      <image id='lastImg' style={{ height: '6012px', width: '750px' }} src='//q.aiyongtech.com/ad/images/5LiT5Lia54mILTI%3D_1663838345708.png'/>
    </scroll-view>, scratch)
    const { node } = wrapper
    await delay(3000);
    assert(node.scrollLeft === 100)
    // 没设置触发事件高度
    node.scrollLeft = 700;
    await delay(500);
    assert(test2.two === true)
    node.scrollLeft = 60;
    await delay(500);
    assert(test2.one === true)

    await wrapper.setProps({
      upperThreshold: 20,
      lowerThreshold: 50,
    })

    test2.one = false;
    test2.two = false;

    node.scrollLeft = 730;
    await delay(500);
    assert(test2.two === true)
    node.scrollLeft = 10;
    await delay(500);
    assert(test2.one === true)

  })

  it('应该可以触发scrollIntoView属性', async () => {
    const scrollStyle = { width: '400px', height: '400px' };
    const wrapper = await mount(<scroll-view style={scrollStyle} scrollY={true} scrollIntoView='lastImg'>
      <image id='firstImg' style={{ height: '4681px', width: '750px' }} src='//q.aiyongtech.com/ad/images/6auY57qn54mILTI%3D_1663677524622.png'/>
      <image id='lastImg' style={{ height: '6012px', width: '750px' }} src='//q.aiyongtech.com/ad/images/5LiT5Lia54mILTI%3D_1663838345708.png'/>
    </scroll-view>, scratch)
    const { node } = wrapper
    assert(node.scrollTop === (4681 + 4))
    
  })

  it('scrollIntoView的优先级应该比scrollTop高', async () => {
    const scrollStyle = { width: '400px', height: '400px' };
    const wrapper = await mount(<scroll-view style={scrollStyle} scrollY={true} scrollTop={400} scrollIntoView='lastImg'>
      <image id='firstImg' style={{ height: '4681px', width: '750px' }} src='//q.aiyongtech.com/ad/images/6auY57qn54mILTI%3D_1663677524622.png'/>
      <image id='lastImg' style={{ height: '6012px', width: '750px' }} src='//q.aiyongtech.com/ad/images/5LiT5Lia54mILTI%3D_1663838345708.png'/>
    </scroll-view>, scratch)
    const { node } = wrapper
    assert(node.scrollTop === (4681 + 4))
    
  })
})
