export const api = ({ callback, ...args }) => {
    console.log('api请求数据', args);
    setTimeout(() => {
        callback({});
    }, 1000);
};