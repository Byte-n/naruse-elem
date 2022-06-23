import {
    logger,
    NOOP
} from './uitl';
/**
 * @description naruseComponent 实现
 * @author CHC
 * @date 2022-03-21 14:03:21
 * @class NaruseComponent
 */
export class NaruseComponent {
    constructor(props) {
        this.state = {};
        this.props = props;
        this.$mounted = false;
        // 中间件实例
        this.$updater = null;
    }
    setState(update, callback = NOOP) {
        if (!this.$updater) {
            logger.error('小程序组件未装载完毕，无法更新！');
            return;
        }
        if (typeof update !== 'object') {
            logger.error('setState 不支持的数据格式！', update);
            return;
        }
        if (this.state === update) return;
        const newState = {
            ...this.state,
            ...update,
        };
        const flag = this.$updater.shouldUpdate(this.props, newState);
        this.state = newState;
        flag && this.$updater.update(callback);
    }
    forceUpdate(callback = NOOP) {
        if (!this.$updater) {
            logger.error('小程序组件未装载完毕，无法更新！');
            return;
        }
        this.$updater.update(callback)
    }
    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
    render() {}
}


/** 判断是否是NaruseComponent */
export const isNaruseComponent = (obj) => obj instanceof NaruseComponent;
