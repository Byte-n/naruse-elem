let _userInfo = {
    showVipTime: '加载中',
    vipFlag: 1,
    showPayBtn: '升级',
    userNick: '老白你在哪',
    tag:'newUserRenewTest,newAdTestB,hasPrivilegedTagA',
    promotion:'2022-03-10 20:11:34',
    vipTime:'2022-03-10 '
} 

/**
 * 获取用户信息
 * @returns 
 */
export const getUserInfo = () => {
    return _userInfo || {};
};

/**
 * 更新用户信息
 */
export const updateUserInfo = () => {
    return new Promise((resolve) => {
        resolve(_userInfo);
    })
}