import { Component, useState, useEffect, useCallback } from 'Naruse';

export default function App () {
    const [value, setValue] = useState();
    useEffect(() => {
        setInterval(() => {
            setValue(Math.random());
        }, 2000);
    }, [])
      return (
          <view>
              <view>A: {value}</view>
              <B/>
              <Counter/>
          </view>
      );
}

function B () {
    useEffect(() => {
        return () => {
            console.error('unmount');
        }
    }, []);
    return (
        <view>每次渲染我并不会被卸载</view>
    );
}

function Counter () {
    const [count, setCount] = useState(0);
    const add = useCallback(() => setCount(count + 1), [count]);
    const sub = useCallback(() => setCount(count - 1), [count]);
    useEffect(() => {
        console.log('count', count);
    }, [count]);
    return (
        <view>
            <view>计数器示例</view>
            <view>{count}</view>
            <view style={{ display: 'flex', width: 120 }}>
                <button onClick={add} style={{ flex: 1 }}>++</button>
                <button onClick={sub} style={{ flex: 1 }}>--</button>
            </view>
        </view>
    );
}
