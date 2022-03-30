import React, { Component } from 'react';
import './App.css';
import ReactMiddleware from '../../package/naruse-h5/dist/index';
import Code from '../../dist/naruse.dev.debug';
import { ayRequireList } from '../../package/naurse-ay-polyfill/index';
import ReactDom from 'react-dom';

window.React = React;
window.ReactDom = ReactDom;

const polyfill = ayRequireList;


class App extends Component {
    render () {
        return <ReactMiddleware code={Code} env={polyfill} />;
    }
}

export default App;
