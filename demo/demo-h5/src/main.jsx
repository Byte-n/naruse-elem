import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import ReactDom from 'react-dom';

window.React = React;
window.ReactDom = ReactDom;

const render = async () => {
    const App = (await import('./App')).default;
    ReactDOM.render(
        React.createElement(App),
        document.getElementById('root')
    );
}

setTimeout(render);
