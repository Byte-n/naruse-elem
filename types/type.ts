// 这是为了方便开发添加的全局类型声明

/**
* 伪react组件
*/
declare class NaruseComponent {
    state: {
        [key in string]: any;
    };
    /** 更改状态 */
    setState: (newState: Object) => {};
    /**
     * 当组件被挂载时被调用
     */
    componentDidMount: () => {};
    /**
     * 当组件每次重新渲染完毕后调用
     */
    componentDidUpdate: () => {};
    /**
     * 渲染函数
     */
    render: () => any;

}


