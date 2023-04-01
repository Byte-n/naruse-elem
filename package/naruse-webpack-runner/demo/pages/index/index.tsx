import { useState } from 'Naruse';


interface JSX {
    qwer: 123
}
const ww =  import('../../common');
console.log(ww);


export default function Qwer (): JSX {
    const [ value, setValue ] = useState(1);
    console.log('render');
    return <view>
        123
        {value}
        <button onClick={() => {
            setValue(value+1)
        }}>123</button>
    </view>;
}

