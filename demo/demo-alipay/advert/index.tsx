import { Component } from 'Naruse';


export default class Qwer extends Component {

    async componentDidMount() {
        const qq = await import('./qwer.css');
        console.log('ccc', qq.ccc);
    }

    render() {
        return <view
        style={{
            backgroundColor: 'red',
            width: '100px',
            height: '10000px',
         }}>
            <web-view src='https://fuwu.taobao.com/ser/assembleParam.htm?spm=a1z13.2196529.0.0.1b1f519fmbgMhQ&tracelog=search&activityCode=&promIds=&subParams=itemCode:FW_GOODS-1827490-1,cycleNum:12,cycleUnit:2' ></web-view>
            {new Array(100).fill(1).map((item, index) => {
                return <view
                style={{
                    backgroundColor: 'blue',
                    width: '100px',
                    height: '100px',
                 }}
                 onFirstAppear={() => {
                    console.log('onFristAppear', index);
                }}
                onClick={() => {
                    console.log('onClick', index);
                }}
                 >
                    {index}
                </view>;
                })}
        </view>;
    }
}
