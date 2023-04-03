import { Component, useState, useEffect, useRef } from 'Naruse';


export default function Qwer() {
    const [first, setfirst] = useState('123')
    const ww = useRef(123);
    useEffect(() => {
        console.log(ww);
        setTimeout(() => {
            setfirst(321);
        }, 2000);
    }, [])

    return <view>123{first}</view>;
}
