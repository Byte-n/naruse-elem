
/**
 * @description 运营运营____广告页面浏览广告页面浏览埋点
 * @author GQH
 * @date 2021-11-12 17:11:23
 * @param modalData 获取的广告数据
 * @param pid
 * @returns {void}  {void}
 */
const adViewBeacon = (modalData, pid) => {
    console.log('发送运营埋点', modalData, pid)
};

/**
 * @description 运营_立即订购埋点
 * @author GQH
 * @date 2021-11-12 17:11:23
 * @param modalData 广告数据
 * @param btnText 按钮名称
 * @param is_first_time_triggered 是否首次触发
 * @returns {void}  {void}
 */
const adOrderNowBeacon = (modalData, btnText, pid) => {
    console.log('发送运营订购埋点', modalData, pid)
};;

export {
    adOrderNowBeacon,
    adViewBeacon,
};
