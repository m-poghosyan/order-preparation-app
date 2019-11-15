import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, compose,  applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free'
import 'antd/dist/antd.css'
import './index.css';


const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
    : i => i;


const store = createStore(
    reducer,
    compose(applyMiddleware(thunkMiddleware), devTools)
);

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'),
    );
};

store.subscribe(render);

render();
