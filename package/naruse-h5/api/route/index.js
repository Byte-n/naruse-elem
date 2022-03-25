
// 是关闭当前页面，跳转到应用内的某个指定页面的 API。
export const redirectTo = ({ url }) => {
    window.location.href = url;
};

export const navigateTo = ({ url }) => {
    window.open(url);
};
