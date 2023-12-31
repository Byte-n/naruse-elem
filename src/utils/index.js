
/**
 * @description 确定交易用户购买情况
 * @author CHC
 * @date 2022-04-01 18:04:40
 * @returns {Promise<-1 | 2 | 3>} -1: 未购买, 2: 续费成功, 3: 升级成功
 */
export const confirmTradeUserBuyResult = () => {
    const userInfo = $userInfoChanger.getUserInfo();
    return $ayApi.apiAsync({
        method: '/tc/user',
        host: '//mtrade.aiyongtech.com',
    }).then((res) => {
        const new_vipFlag = res.vipflag;
        const new_vipTime = res.order_cycle_end;
        let vipResult = -1;
        const old_vipFlag = userInfo.vipFlag;
        const old_vipTime = userInfo.vipTime;

        if (old_vipFlag === 0) { /* 升级 || 续签 */
            if (new_vipFlag === 0) {
                if ($moment(old_vipTime).isSame(new_vipTime)) {
                    vipResult = -1;/* 升级失败 */
                } else {
                    vipResult = 3;/* 如果初级版本时间改变，则是续签成功 */
                }
            } else { /* 升级成功 */
                vipResult = 1;
            }
        } else { /* 续费  old_vipFlag==1 */
            if (new_vipFlag === 0) { /* 续费失败 */
                vipResult = -2;
            } else { /* 续费 */
                if ($moment(old_vipTime).isSame(new_vipTime)) { /* 续费失败 */
                    vipResult = -2;
                } else { /* 续费成功 */
                    vipResult = 2;
                }
            }
        }

        return vipResult;
    });
};


/**
 * @description 确定交易用户购买情况，移动端
 * @author ZH
 * @date 2022-04-13 16:14:40
 * @returns {Promise<-1 | 2 | 3>} -1: 未购买, 2: 续费成功, 3: 升级成功
 */
export const confirmTradeUserBuyResultM = () => {
    const userInfo = $userInfoChanger.getUserInfo();
    return $ayApi.apiAsync({
        apiName: 'aiyong.user.info.get',
        method: '/tc/user',
        host: '//mtrade.aiyongtech.com',
    }).then((res) => {
        console.log(res);
        console.log(userInfo);
        const new_vipFlag = res.vipflag;
        const new_vipTime = res.order_cycle_end;
        let vipResult = -1;
        const old_vipFlag = userInfo.vipFlag;
        const old_vipTime = userInfo.vipTime;

        if (old_vipFlag === 0) { /* 升级 || 续签 */
            if (new_vipFlag === 0) {
                if ($moment(old_vipTime).isSame(new_vipTime)) {
                    vipResult = -1;/* 升级失败 */
                } else {
                    vipResult = 3;/* 如果初级版本时间改变，则是续签成功 */
                }
            } else { /* 升级成功 */
                vipResult = 1;
            }
        } else { /* 续费  old_vipFlag==1 */
            if (new_vipFlag === 0) { /* 续费失败 */
                vipResult = -2;
            } else { /* 续费 */
                if ($moment(old_vipTime).isSame(new_vipTime)) { /* 续费失败 */
                    vipResult = -2;
                } else { /* 续费成功 */
                    vipResult = 2;
                }
            }
        }

        return vipResult;
    });
};

/**
 * 领取免费试用15天
 * @param {Object} args 用户标识
 */
export const getFreeTrial = (args) => {
    $ayApi.apiAsync({
        apiName: 'aiyong.active.freetrial.give',
        method: '/activity/freeTrialUser',
        host: '//trade.aiyongtech.com',
        args,
    }).then((res) => {
        console.log('res===', res);
    })
        .catch((err) => {
            console.log('errr====', err);
        });
};

/**
 * @description 判断当前用户是否是子账号
 * @author CHC
 * @date 2022-04-25 15:04:21
 */
export const isSubUser = () => {
    return !!$userInfoChanger.getUserInfo().subUserNick;
};


/**
 * @description 一元购子账号联系用户
 * @author CHC
 * @date 2022-04-25 16:04:10
 * @param {number} cent_price
 * @param {string} payLink
 * @returns {boolean} 是否是子账号自动联系用户
 */
export const oneYuanActivitySubUserContact = (cent_price, payLink) => {
    if (!isSubUser()) return false;
    $openChat.openChat({
        nick: $userInfoChanger.getUserInfo().userNick,
        text: `请使用主账号参与一${cent_price === '1' ? '分' : '元'}购活动，活动地址: ${payLink}`,
    });
    return true;
};

/**
 * @description 判断用户是否有对应tag
 * @author CHC
 * @date 2022-04-28 12:04:32
 * @param {*} tag
 */
export const hasTag = (tag) => {
    return $userInfoChanger.getUserInfo().tag && $userInfoChanger.getUserInfo().tag.includes(tag);
};

/**
 * @description 获取商品一元购价格
 * @author CHC
 * @date 2022-04-28 13:04:18
 * @returns {*}
 */
export const getItemOneYuanGoCentPrice = () => {
    if (hasTag('itemOneyuangoA')) {
        return '1';
    }
    if (hasTag('itemOneyuangoB')) {
        return '100';
    }
    return '0';
};

/**
 * @description 获取商品一元购价格
 * @author CHC
 * @date 2022-04-28 13:04:18
 * @returns {*}
 */
export const getTradeOneYuanGoCentPrice = () => {
    if (hasTag('newAdTestA')) {
        return '1';
    }
    if (hasTag('newAdTestB')) {
        return '100';
    }
    return '0';
};