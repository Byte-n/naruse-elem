const {
    initVnodeTree,
    clickEventBus
} = require("../core");
Component({
    mixins: [],
    data: {
        item: {}
    },
    props: {
        render: {},
        customEvents: {},
        environments: {}
    },
    didMount() {
        const t = initVnodeTree(this.props.render, this.props.environments);
        this.setData({
            item: t
        }, (() => {
            console.log("caro-log-自定义组件装载成功", this.props);
        }))
    },
    methods: {
        onClick(t) {
            // taro内无法传参直接调用page内的函数
            const e = clickEventBus(t, this.data.item, this.$page.$component ? this.$page.$component.customEvents : this.state.customEvents);
            this.setData({
                item: e
            })
        }
    }
});