
/**
 * @description 拍平style数组
 * @author CHC
 * @date 2022-05-07 19:05:44
 * @param {*} props
 * @returns {*}
 */
export const flatStyleFromProps = (props) => {
    if (!props || typeof props !== 'object') return props;
    if (Array.isArray(props.style)) {
        props.style = props.style.reduce((prev, curr) => {
            return { ...prev, ...curr };
        }, props);
    }
    return props;
};