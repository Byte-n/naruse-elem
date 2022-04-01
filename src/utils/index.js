
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