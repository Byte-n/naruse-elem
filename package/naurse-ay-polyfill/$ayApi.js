export const api = ({ callback, ...args }) => {
    console.log('api请求数据', args);
    setTimeout(() => {
        callback({});
    }, 1000);
};

export const apiAsync = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res({});
        }, 1000);
    });
};