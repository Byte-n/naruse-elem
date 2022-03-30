
// 是关闭当前页面，跳转到应用内的某个指定页面的 API。
export const redirectTo = (opt = {}) => {
    const { url, params, success, fail } = opt;
    my.redirectTo({  });
};

export const navigateTo = ({ url }) => {
    window.open(url);
};
