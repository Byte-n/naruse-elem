interface AdSensorsBeaconExt {
    /* 一级分类 */
    primary_class: string;
    /* 是否首次触发 和武羊商量暂时不用管 */
    is_first_time_triggered?: boolean;
    /* 二级分类 */
    secondary_class: string;
    /* cid */
    creative_id: number;
    /* pid */
    pid: number;
    /* 广告创意名称 */
    creative_name: string;
    /* 广告位置 */
    pid_name: string;
    /* 套餐名称 */
    package_name?: any;
    /* 应付金额 */
    amount_payable?: number;
}

/**
 * @description 运营运营____广告页面浏览广告页面浏览埋点
 * @author GQH
 * @date 2021-11-12 17:11:23
 * @param modalData 获取的广告数据
 * @param pid
 * @returns {void}  {void}
 */
const adViewBeacon = (modalData: AdSensorsBeaconExt, pid: number): void => {};

/**
 * @description 运营_立即订购埋点
 * @author GQH
 * @date 2021-11-12 17:11:23
 * @param modalData 广告数据
 * @param btnText 按钮名称
 * @param is_first_time_triggered 是否首次触发
 * @returns {void}  {void}
 */
const adOrderNowBeacon = (modalData:AdSensorsBeaconExt, btnText: string, pid: string): void => {};

export {
    adOrderNowBeacon,
    adViewBeacon,
};
