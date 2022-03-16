/**
* 封装埋点相关的方法
*/

const adInfo = $adImport.adData.results[0];

/**
 * @desc 广告曝光埋点
 * @author gao01
 * @date 2022/03/16 11:07:24
 */
export const buryAdPageView = () => {
    $adSensorsBeacon.adViewBeacon(adInfo, adInfo.pid);
};

/**
 * @desc 点击购买点击埋点
 * @author gao01
 * @param {string} btnText , ios为固定 `/跳客服` , android为 `${价格}/${单位}`
 * @date 2022/03/16 11:07:24
 */
export const buryAdOrderNow = (btnText) => {
    if (btnText === undefined) {
        btnText = '';
    }
    $adSensorsBeacon.adOrderNowBeacon(adInfo, btnText, adInfo.pid);
};
