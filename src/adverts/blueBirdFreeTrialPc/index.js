import { Component } from 'Naruse';
import { isNotVip } from '@utils/userInfo';
import { getFreeTrial } from '@utils/index';
import { buryAdPageView } from '@utils/beacon';
import MessageTip from '@components/messageTip/index';

// 样式
const dialogMain = {
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 900,
    position: 'fixed',
    top: '0',
    left: '0',
};
const backgroundImg = { width: '600px', height: '400px' };
const dialogBox = { transition: 'all 0.5s', opacity: '1', transform: 'translateY(0)' };
const dialogBoxDown = { opacity: '0', transform: 'translateY(-50%)' };
const hotSpot = {
    width: '220px',
    height: '54px',
    position: 'absolute',
    left: '190px',
    bottom: '48px',
};
const closeStyle = {
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '10px 40px',
    border: '2px solid #FFF',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.5s',
    position: 'absolute',
    left: '240px',
    top: '420px',
};

// 用户信息
const userInfo = $userInfoChanger.getUserInfo();
// 广告信息
const adInfo = $adImport.adData.results[0];

const { baseImgUrl, app, message } = adInfo.user_define.body;

/**
 * pc端青鸟模板
 */
export default class BlueBirdFreeTrialPc extends Component {
    constructor () {
        this.state = {
            isShow: false,
            animation: true,
            isShowMessage: false,
        };
    }

    componentDidMount () {
        const { tag } = userInfo;
        console.log('condition====', !isNotVip || tag.includes('newUserRenewTest') || tag.includes('extendUserRenewTest'));
        if (!isNotVip || tag.includes('newUserRenewTest') || tag.includes('extendUserRenewTest')) {
            return;
        }
        const params = {
            app,
            originTag: 'newUserRenewTest',
            originRemark: 'trade_free_15',
        };
        // 获取免费试用
        getFreeTrial(params);
        // 用户信息更新
        $userInfoChanger.updateUserInfo();
        buryAdPageView();
        this.setState({ isShow: true });
        new Promise((res) => {
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ animation: false });
        });
    }

    /**
     * 弹窗关闭
     */
    colsePopup () {
        this.setState({ animation: true });
        new Promise((res) => {
            console.log('res====', res);
            setTimeout(res, 500);
        }).then(() => {
            this.setState({ isShow: false });
            setTimeout(() => {
                $uninstall();
            }, 3000);
        });
    }

    /**
     * 打开提示信息
     */
    openMessage () {
        this.setState({ isShowMessage: true });
        this.colsePopup();
    }

    render () {
        const { isShow, animation, isShowMessage } = this.state;
        return (
            <view>
                {
                    isShow && (
                        <view style={dialogMain }>
                            <view style={{ ...backgroundImg, ...{ position: 'relative' }, ...dialogBox, ...(animation ? dialogBoxDown : {}) }}>
                                <image
                                    style={backgroundImg}
                                    src={baseImgUrl}
                                />
                                <view style={hotSpot} onClick={this.openMessage.bind(this)}></view>
                                <view
                                    style={closeStyle}
                                    onClick={this.colsePopup.bind(this)}
                                >
                                    {'关闭'}
                                </view>
                            </view>
                        </view>
                    )
                }
                { isShowMessage && <MessageTip message={message} time={3000} /> }
            </view>
        );
    }
}
