let _userInfo = {
    showVipTime: '加载中',
    vipFlag: 0,
    showPayBtn: '升级',
    userNick: '老白你在哪',  
} 

/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = () => {
    return _userInfo || {};
};