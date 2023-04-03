import React, { Component } from 'react';
import './App.css';
import Container, { naruseInit } from '../../../package/naruse-h5/dist/index';
import code from '../dev/index?raw';
import polyfill from 'react/lib/ReactCurrentOwner';

if (React.version.indexOf('15') === 0) {
    React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = {
        ReactCurrentOwner: polyfill,
    };
}

const _defineProperty = (obj, key, value) => {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
};

naruseInit({
    hotPuller() {
        return {
            code: code, ctx: {
                $adImport: {
                    adData: {
                        results: [
                            {
                                user_define: {
                                    body: {

                                    }
                                }
                            }
                        ]
                    }
                },
                _defineProperty,
                $userInfoChanger: {
                    getUserInfo () {
                        return {}
                    }
                },
                $sensorsBeacon: {
                    sensorsBeacon () {

                    }
                }
            }
        }
    },
    async hotImport(path) {
        const res = await import('../dev/' + path + '?raw');
        return res.default;
    }
})

class App extends Component {
    render() {
        console.log(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current)
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Container />
        </div>;
    }
}

export default App;
