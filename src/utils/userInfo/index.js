/**
* 封装跟用户相关的所有信息
*/

const userInfo = $userInfoChanger.getUserInfo();

const timeFormat = 'YYYY-MM-DD hh:mm:ss';


/**
 * @desc 用户版本对应 vipFlag
 * @author gao01
 * @date 2022/03/16 11:32:27
 */
export const vipFlagMap = {
    NOT_PAY: 0,
    COMMON_VIP: 1,
    BASIC: 2,
    AUTO_PAY: 3,
    NEW_USER: 4,
    PLUS: 6,
};



/**
 * @desc 判断用户是否是有效期内的青鸟用户
 * @author gao01
 * @return {boolean}
 * @date 2022/03/16 11:24:45
 */
export const isBlueBirdUser = ()  => {
    const { tag, promotion, vipTime } = userInfo;
    const timeDistance = $moment(promotion, timeFormat).diff($moment());

    const userTag = tag.includes('newUserRenewTest') || tag.includes('extendUserRenewTest');
    const soonExpire = (timeDistance > 0) && isCommonVip();
    const notBuy = $moment(vipTime, timeFormat).diff(promotion) <= 0;

    // 有青鸟tag && 在有效期内 && 没购买过
    return userTag && soonExpire && notBuy;
};


/**
 * @desc 获取青鸟用户到期时间距离现在的时间差 (ms)
 * @author gao01
 * @return {object} { error:boolean, data:string|number } data 正数为剩余多少时间, 负数为到期了多长时间
 * @date 2022/03/16 11:24:45
 */
export const getBlueBirdUserExpireTime = ()  => {
    const { promotion, vipTime } = userInfo;
    const notBuy = $moment(vipTime, timeFormat).diff(promotion) <= 0;
    if ((notBuy && isNotVip()) || isBlueBirdUser()) {
        return {
            error: false,
            data: $moment(userInfo.promotion, timeFormat).diff($moment()),
        };
    }

    return {
        error: true,
        data: '不是青鸟用户',
    };
};

/**
 * @desc 判断vipFlag为1的高级版的vip
 * @author gao01
 * @return {boolean}
 * @date 2022/02/18 11:01:35
 */
export const isCommonVip = () => {
    return userInfo.vipFlag === vipFlagMap.COMMON_VIP;
};

/**
 * @desc 判断vipFlag为0的免费用户
 * @author gao01
 * @return {boolean}
 * @date 2022/02/18 11:01:35
 */
export const isNotVip = () => {
    return userInfo.vipFlag === vipFlagMap.NOT_PAY;
};
