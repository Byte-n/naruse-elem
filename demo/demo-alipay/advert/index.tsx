import { Component } from 'Naruse';


export default class Qwer extends Component {

    async componentDidMount() {
        // const qq = await import('./qwer.css');
        // console.log('ccc', qq.ccc);
    }

    render() {
        return (
            <view>
                {this.renderRadio()}
                {this.renderOnFirstAppear()}
            </view>
        );
    }


    renderOnFirstAppear () {
        return (
            <view
                style={{
                    backgroundColor: 'red',
                    width: '100px',
                    height: '10000px',
                }}>
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
            </view>
        );
    }

    renderRadio () {
        const { radioValue = 'b' } = this.state;
        return (
            <view>
                当前选项值：{radioValue}
                <radio-group onChange={evl => this.setState({ radioValue: evl.detail.value })}>
                    <radio value={'a'} checked={radioValue === 'a'}>
                        a选项
                    </radio>
                    <radio value={'b'} checked={radioValue === 'b'}>
                        b选项
                    </radio>
                </radio-group>
            </view>
        );
    }
}
