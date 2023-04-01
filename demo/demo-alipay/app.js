// 初始化 naruse
import { naruseInit } from './naruse-alipay/lib';
import code from './dev/index';

naruseInit({
    hotPuller() {
        return { code, ctx: {} };
    },
    hotImport (path) {
        console.log('hotImport', path);
        // 支付宝小程序访问 8080 端口下的地址文件
        return my.httpRequest({
            url: 'http://localhost:6936/dev/' + path,
            method: 'GET',
            dataType: 'text',
        }).then((res) => res.data);
    }
})

App({
  onLaunch(options) {
    console.info('[naruse-app] onLaunch', options);
  },
  onShow(options) {
  },
});
