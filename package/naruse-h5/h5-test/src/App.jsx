import React, { Component } from 'react';
import './App.css';
import ReactMiddleware from '../../dist/index';
import Code from '../../../../dist/naruse.dev.debug';
import { ayRequireList } from '../../../naurse-ay-polyfill/index';
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
