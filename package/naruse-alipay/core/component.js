import { logger } from './uitl';
/**
 * @description naruseComponent 实现
 * @author CHC
 * @date 2022-03-21 14:03:21
 * @class NaruseComponent
 */
export class NaruseComponent {
    constructor (props) {
        this.props = props;
        this.$mounted = false;
        // 中间件实例
        this.$updater = null;
    }
    setState (update, callback) {
        if (!this.$updater) {
            logger.error('小程序组件未装载完毕，无法更新！');
            return;
        }
        if (typeof update !== 'object') {
            logger.error('setState 不支持的数据格式！', update);
            return;
        }
        if (this.state === update) return;
        this.state = {
            ...this.state,
            ...update,
        };
        this.$updater.update(callback);
    }
    componentDidMount () { }
    componentDidUpdate () { }
    componentWillUnmount () { }
    render () { }
}


/** 判断是否是NaruseComponent */
export const isNaruseComponent = (obj) => obj instanceof NaruseComponent;
