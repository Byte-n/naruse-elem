const baseUrl = 'https://q.aiyongtech.com/trade/web/images/caro/testModal/';
const selectImgStyle = {
  width: '210rpx',
  height: '250rpx',
  marginLeft: '14rpx',
  marginRight: '14rpx',
};

const selectImgObj = [
  {
    defaultValue: '季度未选中',
    notSelected: '季度未选中',
    target: '季度按钮',
    selected: '季度选中',
    link: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_210520165254%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007049474%5D&subParams=cycleNum%3A3%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=792D9F1FD3404BFE05AAC79EC2C51A25',
  },
  {
    defaultValue: '半年选中',
    notSelected: '半年未选中',
    target: '半年按钮',
    selected: '半年选中',
    link: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_210520165254%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007049474%5D&subParams=cycleNum%3A6%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=C093214C834DB95FDE3BBCEE9085C0ED',
  },
  {
    defaultValue: '一年未选中',
    notSelected: '一年未选中',
    target: '年按钮',
    selected: '一年选中',
    link: 'https://fuwu.taobao.com/ser/confirmOrder1.htm?commonParams=activityCode%3AACT_877021141_210520165254%3BagentId%3Afuwu.taobao.com%7Cmarketing-Order-0%3BmarketKey%3AFWSPP_MARKETING_URL%3BpromIds%3A%5B1007049474%5D&subParams=cycleNum%3A12%2CcycleUnit%3A2%2CitemCode%3AFW_GOODS-1828810-v2&sign=3C4469CCF2C31583D06B5D14B61BF043',
  },
];

<view style={{ position: 'relative', width: '100%' }}>
  <view style={{ maxWidth: '100%', background: '#F4C856', borderRadius: '1rpx', padding: '28rpx' }}>
    <view
      id='剩余事件'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '32rpx',
        fontFamily: 'PingFangSC-Medium, PingFang SC',
        fontWeight: 500,
        color: '#ED3C23',
      }}>
      <view></view>
      <image src={`${baseUrl}图标.png`} style={{ width: '220rpx', height: '40rpx' }} />
    </view>
  </view>
  <image src={`${baseUrl}特权.png`} style={{ width: '100%', height: '665rpx', marginTop: '36rpx' }} />
  <view style={{ position: 'relative' }}>
    <image src={`${baseUrl}自由选择.png`} style={{ width: '450rpx', height: '40rpx', marginLeft: '150rpx', marginTop: '36rpx' }} />
    <view style={{ width: '508rpx', position: 'absolute', bottom: '110rpx', fontSize: '28rpx', color: '#B58535', left: '50%', transform: 'translateX(-50%)' }}>累计已有 3,129,847 个卖家选择爱用商品</view>
  </view>
  <view style={{ width: '100%', height: '300rpx', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {selectImgObj.map((value, index, array) => {
      const { defaultValue,target, selected,link } = value;
      return <image
        id={`selectBtn-${defaultValue}`}
        src={`${baseUrl}${defaultValue}.png`}
        style={selectImgStyle}
        onClick={[
          <changeDom targetId='bottomBtn' onClick={[
            <gotoWebPage url={link} isShopLink={true} />
          ]} src={`${baseUrl}${target}.png`} />,
          // 改变
          <changeDom targetId={`selectBtn-${defaultValue}`} src={`${baseUrl}${selected}.png`} />,
          // 还原
          ...array.filter((_, thisIndex) => thisIndex !== index).map((item) => <changeDom targetId={`selectBtn-${item.defaultValue}`} src={`${baseUrl}${item.notSelected}.png`} />)
        ]} />
    })}
  </view>
  <view style={{ marginLeft: '36rpx', marginTop: '10rpx', fontSize: '24rpx', color: '#333333' }}>购买后七天无理由退钱</view>
  <view style={{ height: '120rpx' }}></view>
  <image
    id='bottomBtn'
    onClick={[
      <gotoWebPage url={'https://c.tb.cn/Y4.SvhWK'} isShopLink={true} />
    ]}
    src={`${baseUrl}半年按钮.png`}
    style={{ width: '100%', height: '110rpx', position: 'fixed', bottom: 0, zIndex: 10, left: 0 }} />
</view>