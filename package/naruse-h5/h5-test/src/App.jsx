import { Component } from 'react';
import './App.css';
import ReactMiddleware from '../../dist/index';
import Code from '../../../../dist/naruse.dev.debug';


class App extends Component {
    render () {
        return <ReactMiddleware code={Code} />;
    }
}

export default App;
