import { Component } from "Naruse";

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

    renderOnFirstAppear() {
        return (
            <view
                style={{
                    backgroundColor: "red",
                    width: "100px",
                    height: "10000px",
                }}
            >
                {new Array(100).fill(1).map((item, index) => {
                    return (
                        <view
                            style={{
                                backgroundColor: "blue",
                                width: "100px",
                                height: "100px",
                            }}
                            onFirstAppear={() => {
                                console.log("onFristAppear", index);
                            }}
                            onClick={() => {
                                console.log("onClick", index);
                            }}
                        >
                            {index}
                        </view>
                    );
                })}
            </view>
        );
    }

    renderRadio() {
        const { radioValue = "b" } = this.state;
        return (
            <view>
                当前选项值：{radioValue}
                <radio-group onChange={(evl) => console.log(evl)}>
                    <radio value={"a"}>a选项</radio>
                    <radio value={"b"}>b选项</radio>
                </radio-group>
                <checkbox-group onChange={(evl) => console.log(evl)} disabled>
                    <checkbox value={"aa"}>aa选项</checkbox>
                    <checkbox value={"bb"} checked>
                        bb选项
                    </checkbox>
                    <checkbox value={"cc"}>cc选项</checkbox>
                </checkbox-group>
                
                <switch onChange={(evl) => console.log(evl)} />
                <view style={{ width: "80%", margin: "0 auto" }}>
                    <slider
                        min={-20}
                        max={20}
                        // step={5}
                        // value={50}
                        // showValue
                        // activeColor="#000"
                        // backgroundColor="#fff"
                        // trackSize={15}
                        // handleSize={50}
                        // handleColor="#eee"
                        onChanging={(evl) => console.log(evl)}
                        onChange={(evl) => console.log(evl)}
                    />
                </view>
            </view>
        );
    }
}
