import { createElement, Component, render, createRef } from 'rax';
import { View, } from 'rax-components';
import { Naruse, Container, naruseInit } from '../../../lib'
import RAP from 'rap-sdk';
import code from '../../../dev/index'

let ip = null;
try {
    // 从 loaction 中获取当前设备ip地址
    // 例子 rap://openplugin/6541416/index_rapjson_=http%3A%2F%2F192.168.1.215%3A8888%2Frap%2Frap.json
    const url = window.location.href;
    const path = url.split('=')[1];
    const decodePath = decodeURIComponent(path);
    const pathArr = decodePath.split('/');
    ip = pathArr[2].split(':')[0];
    RAP.toast.show(ip, 9000);
} catch (e){
    setTimeout(() => RAP.toast.show(e.toString(), 9000), 2000)
}


naruseInit({
    hotPuller () {
        return { code }
    },
    hotImport (qwer) {
        const realPath = 'http://' + ip + ':6677/dev/' + qwer;
        const res = window.fetch(realPath,{
            method: 'get',
            dataType: 'text',
        }).then((res) => {
            return res.text();
        }).then((r) => {
            return r;
        });
        return res;
    }
})



class Qwer extends Component {
    constructor() {
        super();
    }
    componentDidMount() {
        // bc.postMessage('冲冲冲！');
    }
    render() {
        return <View>
            <Container />
        </View>;
    }
}


render(<Qwer />)
