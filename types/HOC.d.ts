declare module 'Naruse' {
    /** 获取当前页面实例 */
    interface withPage {
        (component: Component): Component
    }

    let withPage = withPage;
}