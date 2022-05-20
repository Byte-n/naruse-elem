// 数据管道，因为taro不支持直接传入复杂
let id = 0;
const componentMap = {};

/**
 * @description 获取组件属性
 * @author CHC
 * @date 2022-05-08 23:05:30
 * @param {*} id
 * @returns {*}
 */
const getComponentDataById = (id) => {
    return componentMap[id];
};


/**
 * @description 设置组件数据并返回id
 * @author CHC
 * @date 2022-05-08 23:05:13
 * @param {*} data
 * @returns {*}
 */
const setComponentData = (data) => {
    componentMap[++id] = data;
    return id;
};


/**
 * @description 删除组件数据
 * @author CHC
 * @date 2022-05-08 23:05:40
 * @param {*} id
 */
const clearComponentDataById = (id) => {
    delete componentMap[id];
};

export {
    clearComponentDataById,
    setComponentData,
    getComponentDataById,
};