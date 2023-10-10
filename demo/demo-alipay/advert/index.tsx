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
            <web-view src='https://opendocs.alipay.com/mini/tool/h5?pathHash=37933357' ></web-view>
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
