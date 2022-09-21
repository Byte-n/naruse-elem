import React, { Component } from 'react';
import './App.css';
import Container, { naruseInit } from '../../package/naruse-h5/dist/index';
import Code from '../../dist/naruse.dev.debug';
import { ayRequireList } from '../../package/naurse-ay-polyfill/index';

naruseInit({
    hotPuller() {
        return { code: Code, ctx: ayRequireList }
    }
})

class App extends Component {
    render() {
        return <Container test={1} />;
    }
}

export default App;
