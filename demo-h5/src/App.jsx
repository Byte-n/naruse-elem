import React, { Component } from 'react';
import './App.css';
import Container, { naruseInit } from '../../package/naruse-h5/dist';
import Code from '../../dist/naruse.dev.debug';
import { ayRequireList } from '../../package/naurse-ay-polyfill/index';
import ReactDom from 'react-dom';

window.React = React;
window.ReactDom = ReactDom;

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
