import { createElement, Component, render, createRef } from 'rax';
import { View, } from 'rax-components';
import { Naruse } from '../../../../package/naruse-weex/build/lib'
import RAP from 'rap-sdk';

Naruse.setStorage({
    key: 'currentCity',
    data: {
        city: '北京',
        cityId: '1',
    },
}).then(() => {
    console.log(Naruse.getStorage({
        key: 'currentCity',
        success: function (res) {
            alert('获取成功：' + res.data);
        },
        fail: function (res) {
            alert(res.errorMessage);
        }
    }).then(() => {
        Naruse.removeStorage({
            key: 'currentCity',
            success: function () {
                alert('删除成功');
            }
        }).then(() => {
            Naruse.getStorage({
                key: 'currentCity',
                success: function (res) {
                    alert('获取成功：' + res.data);
                },
                fail: function (res) {
                    alert(res.errorMessage);
                }
            })
        });
    }))
})




class Qwer extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
    }

    render() {
        return <View>
            <View style={{ width: 200, height: 200, backgroundColor: 'blue', color: 'red', fontSize: '500rpx', fontWeight: '900' }}>123</View>
        </View>;
    }
}


render(<Qwer />)
