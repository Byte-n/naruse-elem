
import { Component, withPage, navigateTo } from 'Naruse';
class Demo extends Component {
    
    render() {
        return <view><button onClick={() => {
            navigateTo({ url: 'pages/itemMy/index' })
        }}>
            冲到我的页面
            </button></view>
    }
}


export default withPage(Demo)