import {
    logger,
    NOOP
} from './uitl';
import type { Middware } from './middware';
/**
 * @description naruseComponent 实现
 * @author CHC
 * @date 2022-03-21 14:03:21
 * @class NaruseComponent
 */
export class NaruseComponent {
    state: Record<string, any>;
    props: Record<string, any>;
    $mounted: boolean;
    $updater: Middware | null;
    constructor(props: Record<string, any>) {
        this.state = {};
        this.props = props;
        this.$mounted = false;
        // 中间件实例
        this.$updater = null;
    }
    setState(update: Record<string, any>, callback = NOOP) {
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
        const flag = this.$updater.shouldUpdate(this.props, this.state);
        flag && this.$updater.update(callback)
    }
    componentDidMount() {}
    componentDidUpdate() {}
    componentWillUnmount() {}
    render() {}
}


/** 判断是否是NaruseComponent */
export const isNaruseComponent = (obj: any) => obj instanceof NaruseComponent;
