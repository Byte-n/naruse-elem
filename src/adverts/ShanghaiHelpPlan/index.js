// import TemplateFlag0 from './templateFlag0';
import TemplateFlag1 from './templateFlag1';
import { Component, getStorageSync, setStorageSync } from 'Naruse';
// import { isCommonVip, isNotVip } from '@utils/userInfo';

const userInfo = $userInfoChanger.getUserInfo();
const { userNick,tag } = userInfo;
const hasActivityTag = () => {
    return tag.includes('shanghaiAidFlag0') || tag.includes('shanghaiAidFlag1');
}
const countCacheKey = `shanghai_aid_${userNick}`;// 缓存计数键值
const toDay = $moment().format('YYYYMMDD');

/**
 * @desc 上海助力活动弹窗
 * @author gao01
 * @date 2022/04/28 10:38:04
 */
export default class ShanghaiHelpPlan extends Component {
    constructor () {
        this.state = { dialogVisible: false };
    }

    componentDidMount () {
        const recorded = getStorageSync(countCacheKey, toDay);
        console.log('gao recorded', (recorded === toDay),hasActivityTag());
        if(hasActivityTag() || (recorded === toDay)){
            $uninstall()
            return
        }
        setStorageSync(countCacheKey, toDay)
        console.log('gao toDay', toDay);
        this.setState({ dialogVisible: true })
    }

    getTemplate(){
        // console.log('gao TemplateFlag-0', );
        // return <TemplateFlag0/>
        console.log('gao TemplateFlag-1', );
        return <TemplateFlag1/>
    }

    render () {
        const { dialogVisible } = this.state
        return (<view> {dialogVisible && this.getTemplate()} </view>);
    }
}
