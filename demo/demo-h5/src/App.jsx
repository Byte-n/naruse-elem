import React, { Component } from 'react';
import './App.css';
import Container, { naruseInit } from '../../../package/naruse-h5/dist/index';
import Code from '../../../dist/naruse.dev.debug';
const _defineProperty = (obj, key, value) => {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
  }
  

naruseInit({
    hotPuller() {
        return { code: Code, ctx: { _defineProperty } }
    }
})

class App extends Component {
    render() {
        return <Container test={1} />;
    }
}

export default App;
