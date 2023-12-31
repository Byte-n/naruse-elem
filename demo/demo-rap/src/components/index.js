

<script>
import { Bridge } from 'dolphin-native-bridge'
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
const clipboard = weex.requireModule('clipboard')
const animation = weex.requireModule('animation')
const tabType = {
  log: [],
  storage: [],
  WXEnvironment: ['Vue.version：' + Vue.version, { ...WXEnvironment }],
}
export default {
  name: 'weex-console',
  props: {
    initialTop: [String, Number],
    initialLeft: [String, Number],
  },
  data() {
    return {
      hasBridgeModule: weex.isRegisteredModule('bridgeModule'),
      tabName: 'log',
      top: 0,
      left: 0,
      maxTop: 0,
      maxLeft: 0,
      showPanel: false,
      showNote: true,
      hideNoteCount: 3,
      tabType,
    }
  },
  computed: {
    computedTop() {
      if (this.top <= 80) {
        return 80
      } else {
        return ~~Math.min(this.top, this.maxTop)
      }
    },
    computedLeft() {
      if (this.left <= 0) {
        return 0
      } else {
        return ~~Math.min(this.left, this.maxLeft)
      }
    },
  },
  watch: {
    showPanel(newValue) {
      if(!this.hasShowPanel && newValue) {
        this.hideNote()
        this.hasShowPanel = true
      }
    },
    tabName(newTab) {
      const act = {
        storage: () => {
          this.tabType.storage = []
          this.getAllStorages().then(res => {
            this.tabType.storage.push(Object.keys(res))
            this.tabType.storage.push(res)
          })
        },
      }
      act[newTab] && act[newTab]()
    },
  },
  mounted() {
    this.getConsoleWH()
  },
  methods: {
    getConsoleWH() {
      return new Promise(resolve => {
        const dom = weex.requireModule('dom')
        const main = () =>
          dom.getComponentRect(this.$refs['weex-console'], ({ size: { width, height } }) => {
            if (!width || !height) {
              main()
              return
            }
            this.consoleWidth = width
            this.consoleHeight = height
            this.maxTop = WXEnvironment.deviceHeight - height
            this.maxLeft = 750 - width
            this.top = typeof this.initialTop === 'undefined' ? 150 : +this.initialTop
            this.left = typeof this.initialLeft === 'undefined' ? 150 : +this.initialLeft
            resolve({ width, height })
          })
        main()
      })
    },
    panstart({ changedTouches: [{ pageX, pageY }] }) {
      this.pageX = pageX
      this.pageY = pageY
    },
    panmove({ changedTouches: [{ screenX, screenY }] }) {
      if (!this.isIos) {
        this.top = screenY - this.pageY
        this.left = screenX - this.pageX
      } else {
        // ios 的 pageXY 跟 screenXY 一样，知呢如下折中处理
        this.top = screenY - this.consoleHeight / 2
        this.left = screenX - this.consoleWidth / 2
      }
    },
    handleClear() {
      if (this.tabName === 'log') {
        this.tabType.log = []
      } else if (this.tabName === 'storage') {
        modal.confirm(
          {
            message: '删除全部缓存',
            okTitle: '确认',
            cancelTitle: '删除',
          },
          value => {
            value === '确认' &&
              this.removeAllStorages()
                .then(() => {
                  this.getAllStorages().then(res => {
                    this.tabType.storage.push(Object.keys(res))
                    this.tabType.storage.push(res)
                  })
                  modal.toast({ message: '删除成功' })
                })
                .catch(e => modal.toast({ message: e.toString() }))
          }
        )
      }
    },
    closePanel() {
      if (!this.showPanel) return
      this.showPanel = false
    },
    addLog(logArr) {
      tabType.log.push(
        logArr.reduce((acc, item = 'undefined') => {
          const objType = Object.prototype.toString.call(item)
          acc.time = this.getFormatDate('HH:mm:ss')
          acc.value +=
            (['[object Array]', '[object Object]'].includes(objType)
              ? JSON.stringify(item, null, 2)
              : item.toString()) + '  '
          return acc
        }, { time: 'time', value: '' })
      )
    },
    getAllStorages() {
      // 优化点，当操作了 storage 时才重新读
      const getItemPromies = []
      const storageObj = {}
      return new Promise((resolveA, rejectA) =>
        storage.getAllKeys(({ data: storageKeys, result }) => {
          if (result !== 'success') {
            rejectA('storage.getAllKeys error')
          }
          storageKeys.forEach(key =>
            getItemPromies.push(
              new Promise((resolveB, rejectB) =>
                storage.getItem(key, event => {
                  if (event.result !== 'success') {
                    rejectB(`storage.getItem('${key}') error`)
                    return
                  }
                  let data = null
                  try {
                    data = JSON.parse(event.data)
                  } catch {
                    data = event.data
                  }
                  storageObj[key] = data
                  resolveB({ key, data })
                })
              )
            )
          )
          Promise.all(getItemPromies)
            .then(() => resolveA(storageObj))
            .catch(e => rejectA(e))
        })
      )
    },
    removeAllStorages() {
      const removeItemPromies = []
      return new Promise((resolveA, rejectA) =>
        storage.getAllKeys(({ data: storageKeys, result }) => {
          if (result !== 'success') {
            rejectA('storage.getAllKeys error')
          }
          storageKeys.forEach(key =>
            removeItemPromies.push(
              new Promise((resolveB, rejectB) =>
                storage.removeItem(key, event => {
                  event.result !== 'success' ? rejectB(`storage.removeItem('${key}') error`) : resolveB()
                })
              )
            )
          )
          Promise.all(removeItemPromies)
            .then(() => resolveA())
            .catch(e => rejectA(e))
        })
      )
    },
    copyLog(log) {
      clipboard.setString(log)
      modal.toast({ message: '已复制' })
    },
    getFormatDate(format = 'yyyyMMddHHmmss') {
      const now = new Date()
      return format
        .replace('yyyy', now.getFullYear().toString())
        .replace(/MM/, (now.getMonth() + 1).toString().padStart(2, 0))
        .replace('dd', now.getDate().toString().padStart(2, 0))
        .replace('HH', now.getHours().toString().padStart(2, 0))
        .replace(/mm/, now.getMinutes().toString().padStart(2, 0))
        .replace('ss', now.getSeconds().toString().padStart(2, 0))
    },
    hideNote() {
      this.hideNoteCountTimer = setInterval(() => {
        if (--this.hideNoteCount == 0) {
          clearInterval(this.hideNoteCountTimer)
          animation.transition(
            this.$refs.note,
            {
              styles: {
                height: 0,
              },
              duration: 1111, //ms
              timingFunction: 'ease-out',
              needLayout: true,
              delay: 1000, //ms
            },
            () => (this.showNote = false)
          )
        }
      }, 1000)
    },
  },
}
</script>

<style>
.wc-wrapper {
  position: fixed;
  width: 0;
  height: 0;
  top: 0;
  left: 0;
  /* bottom: 0;
  right: 0; */
}
.wc-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  height: 1000px;
}
.wc-btn {
  position: fixed;
  background-color: #4f7691;
  padding: 20px 30px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  font-size: 33px;
}
.wc-panel-tabs {
  justify-content: center;
  flex-direction: row;
  background-color: #ededed;
  height: 82px;
}
.wc-panel-tab-item {
  flex: 1;
  align-items: center;
  justify-content: center;
  /* border: 2ox solid rgba(0, 0, 0, 0.1); 不支持，只能一个个设置 */
  border-top-width: 2px;
  border-bottom-width: 2px;
  border-right-width: 2px;
  border-top-style: solid;
  border-bottom-style: solid;
  border-right-style: solid;
  border-top-color: rgba(0, 0, 0, 0.1);
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-right-color: rgba(0, 0, 0, 0.1);
}
/* .wc-panel-tab-item.active, wc-panel-tab-item。active */
.wc-panel-tab-item:active {
  background-color: #f7f7f7;
}
.wc-panel-tab-item-active {
  background-color: #f7f7f7;
}
.wc-panel-body {
  padding-bottom: 78px;
}
.wc-panel-body-item {
  padding: 8px 12px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.1);
}
.wc-panel-body-item:active {
  background-color: #f7f7f7;
}
.time-text {
  font-size: 20px;
  margin-bottom: 2px;
  color: #666;
}
.wc-footer {
  flex-direction: row;
  justify-content: center;
  height: 78px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ededed;
  border-top-width: 2px;
  border-top-style: solid;
  border-top-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-bottom-color: rgba(0, 0, 0, 0.1);
}
.wc-footer-item {
  flex: 1;
  align-items: center;
  justify-content: center;
  border-right-width: 2px;
  border-right-style: solid;
  border-right-color: rgba(0, 0, 0, 0.1);
}
.wc-footer-item:active {
  background-color: #f7f7f7;
}
.note {
  padding: 15px 0;
  align-items: center;
  background-color: #e1e8eb;
}
</style>