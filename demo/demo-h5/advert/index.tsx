import { Component } from 'Naruse';


export default class Qwer extends Component {

    async componentDidMount () {
        const qq = await import('./qwer.css');
        console.log('ccc', qq.ccc);
    }

    render () {
        return (
            <view style={{ display: 'flex', 'flexDirection': 'column' }}>
                <view style={{ height: '40vh' }} >
                    <web-view style={{ height: '40vh', width: '50vw' }} src="https://opendocs.alipay.com/mini/tool/h5?pathHash=37933357"></web-view>
                </view>
                <view
                    style={{
                        backgroundColor: 'red',
                        width: '100px',
                        height: '60vh',
                    }}>
                    {new Array(100).fill(1).map((item, index) => {
                        return <view
                            style={{
                                backgroundColor: 'blue',
                                width: '100px',
                                height: '100px',
                            }}
                            onAppear={() => {
                                console.log('onAppear', index);
                            }}
                            onDisappear={() => {
                                console.log('onDisappear', index);
                            }}
                            onClick={() => {
                                console.log('onClick', index);
                            }}
                        >
                            {index}
                        </view>;
                    })}
                </view>
            </view>
        );
    }
}
