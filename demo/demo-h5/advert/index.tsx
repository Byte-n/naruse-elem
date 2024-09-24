import { Component } from "Naruse";

export default class Qwer extends Component {
    async componentDidMount() {
        const qq = await import("./qwer.css");
    }
    render() {
        return (
            <view>
                <radio-group onChange={(evl) => console.log(evl.detail)}>
                    <radio name="a" value={"a"} checked>
                        aaa
                    </radio>
                    <radio name="a" value={"b"}>
                        bbb
                    </radio>
                </radio-group>
                <checkbox
                    value="dsad"
                    label="d1111"
                    checked
                    color="#eee"
                    onChange={(evl) => console.log(evl.detail)}
                >
                    你好
                </checkbox>
                <view></view>

                <checkbox-group onChange={(evl) => console.log(evl)}>
                    <checkbox value={"aa"}>aa选项</checkbox>
                    <checkbox value={"bb"} checked>
                        bb选项
                    </checkbox>
                    <checkbox value={"cc"}>cc选项</checkbox>
                </checkbox-group>

                <switch
                    onChange={(evl) => console.log(evl)}
                    // color="#000"
                />
                <view style={{ width: "80%", margin: "0 auto" }}>
                    <slider
                        // min={-20}
                        // max={20}
                        // step={5}
                        // value={50}
                        // showValue
                        // activeColor="#000"
                        // backgroundColor="#fff"
                        // trackSize={60}
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
