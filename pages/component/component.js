Component({
  mixins: [],
  data: {},
  props: {},
  didMount() {
    this.$page.onPageScroll = () => {
      console.log('组件覆盖咯')
    }
    console.log(this);
  },
  didUpdate() {},
  didUnmount() {},
  methods: {},
});