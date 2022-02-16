const baseUrl = 'https://q.aiyongtech.com/trade/web/images/';

<view style={{ position: 'relative', backgroundColor:'#FCD0AB' }}>
  <image src={`${baseUrl}softTextPay2.png`} style={{ width: '750rpx', height: '403rpx', marginBottom:'60rpx' }} />
  <view style={{margin:'25rpx 25rpx 110rpx',backgroundColor:'#fff',position: 'relative',paddingTop:'30rpx' }}>
    <view style={{position: 'absolute',top:'-30rpx',display:'inline-block', backgroundColor:'#943622', fontSize:'40rpx', fontWeight: '500', color:'#fff',padding:'18rpx',borderRadius:'12rpx',borderBottomLeftRadius:'0',marginTop:'-20rpx'}}>获取免费流量</view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'40rpx',fontWeight: '500'}}>1.找亲朋好友贡献流量</view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'20rpx',lineHeight:'50rpx'}}>开好店铺后首先得找亲朋好友做第一波访客，记得浏览商品在3分钟以上哦，然后可和客服聊天， 再下单评论。 订单量突破零增加官方流量权重。</view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'40rpx',fontWeight: '500'}}>2.优化标题
    <view style={{display: 'inline-block',marginLeft: '20rpx',color: '#2D6EFF',fontSize: '12px',textDecoration: 'underline'}}
      onClick={[
        <gotoWebPage url={`miniapp:///pages/titleOptimize/index`}/>,
        <beacon type='sensorbeacon' props={['ButtonClick',{button_name:'优化标题-点击前往'}]}/>
      ]}>点击前往></view>
    </view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'20rpx',lineHeight:'50rpx'}}>这个很重要！据官方统计，目前50%以上的订单是 买家通过搜索关键词后下单的。取好商品的名字对 于搜索至关重要。主标题+副标题+行业热词+促销 词，搭配起来搜索起飞！</view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'40rpx',fontWeight: '500'}}>3.做主图视频、手机详情页
      <view style={{display: 'inline-block',marginLeft: '20rpx',color: '#2D6EFF',fontSize: '12px',textDecoration: 'underline'}}
      onClick={[
        <gotoWebPage url={`miniapp:///pages/newDescMobile/index`} />,
        <beacon type='sensorbeacon' props={['ButtonClick',{button_name:'做主图视频、手机详情页-点击前往'}]}/>
      ]}>点击前往></view>
    </view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'20rpx',lineHeight:'50rpx'}}>淘宝的官方规则是商品有主图视频和手机详情页的 会多给流量，那么为什么不蹭呢！</view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'40rpx',fontWeight: '500'}}>4.写微淘
      <view style={{display: 'inline-block',marginLeft: '20rpx',color: '#2D6EFF',fontSize: '12px',textDecoration: 'underline'}}
      onClick={[
        <gotoWebPage url={`miniapp:///pages/detailTemplate/index`}  />,
        <beacon type='sensorbeacon' props={['ButtonClick',{button_name:'写微淘-点击前往'}]}/>
      ]}>点击前往></view>
    </view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'20rpx',lineHeight:'50rpx'}}>很多卖家不愿意写文案发微淘，毕竟写东西是很痛 苦的事情，但是微淘可是在淘宝的首页中，流量口 是很大的，此“堡垒”不能有失。</view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'40rpx',fontWeight: '500'}}>5.商品需要频繁上下架
      <view style={{display: 'inline-block',marginLeft: '20rpx',color: '#2D6EFF',fontSize: '12px',textDecoration: 'underline'}}
      onClick={[
        <gotoWebPage url={`miniapp:///pages/autoMaticMounting/index`}  />,
        <beacon type='sensorbeacon' props={['ButtonClick',{button_name:'商品需要频繁上下架-点击前往'}]}/>
      ]}>点击前往></view>
    </view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'20rpx',lineHeight:'50rpx'}}>官方会在商品下架的前一段时间内给很多流量，因 此钻他漏洞做好频繁上下架。</view>
  </view>

  <view style={{margin:'25rpx',backgroundColor:'#fff',position: 'relative',paddingTop:'30rpx'}}>
    <view style={{position: 'absolute',top:'-30rpx',display:'inline-block', backgroundColor:'#943622', fontSize:'40rpx', fontWeight: '500', color:'#fff',padding:'18rpx',borderRadius:'12rpx 12rpx 12prx 0',marginTop:'-20rpx'}}>有了流量就要勾住他们下单了</view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'40rpx',fontWeight: '500'}}>1.促销水印加起来
    <view style={{display: 'inline-block',marginLeft: '20rpx',color: '#2D6EFF',fontSize: '12px',textDecoration: 'underline'}}
      onClick={[
        <gotoWebPage url={`miniapp:///pages/waterMark/index`} />,
        <beacon type='sensorbeacon' props={['ButtonClick',{button_name:'促销水印加起来-点击前往'}]}/>
      ]}>点击前往></view>
    </view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'20rpx',lineHeight:'50rpx'}}>跟紧官方每季一大促每月一小促的节奏，在我们的 商品图片中打上各种促销文案，这样才能在繁杂的 商品中脱颖而出，促进买家下单。</view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'40rpx',fontWeight: '500'}}>2.店铺打折活动必不可少
      <view style={{display: 'inline-block',marginLeft: '20rpx',color: '#2D6EFF',fontSize: '12px',textDecoration: 'underline'}}
      onClick={[
        <gotoWebPage url={`miniapp:///pages/promotionalList/index`}  />,
        <beacon type='sensorbeacon' props={['ButtonClick',{button_name:'店铺打折活动必不可少-点击前往'}]}/>
      ]}>点击前往></view>
    </view>
    <view style={{color:'#333333',padding:'0 20rpx', fontSize:'30rpx',marginTop:'20rpx',lineHeight:'50rpx'}}>满减活动、新用户大额券、第二件半价等都要创建 起来，用低价吸引买家下单（宁可首单不赚钱）， 这样才会有后续流量。</view>
  </view>

  <view style={{position: 'relative',paddingTop:'132rpx',textAlign:'center',backgroundImage:'url(https://q.aiyongtech.com/trade/web/images/softTextPay1.png)',height:'894rpx',backgroundRepeat: 'no-repeat',backgroundSize:'contain',boxSizing: 'border-box',marginTop:'72rpx'}}>
  <image src={`${baseUrl}softTextPay3.png`} style={{display:'block', width: '430rpx', height: '130rpx' ,margin: '0 auto' }} 
  onClick={[
    <contactWW text='亲，我要订购高级版https://c.tb.cn/Y4.SwO8i' />,
  ]}/>
  </view>
</view>