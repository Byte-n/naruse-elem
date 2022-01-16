
import { clickEventBus, initVnodeTree } from "../../caro";
import testVnode from '../template/output';

Component({
  props: {
    render: {},
  },
  data: {
    item: initVnodeTree(testVnode)
  },
  methods: {
    /** 所有元素的点击事件都会通过这里进行分发 */
    onClick(event) {
      const item = clickEventBus(event, this.data.item);
      this.setData({ item })
    },
  }
});
