import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { compose, createStore } from 'redux'

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import devTrackerApp from './reducers/main-reducer';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import adapter from 'redux-localstorage/lib/adapters/localStorage';
import filter from 'redux-localstorage-filter';

let loggerMiddleware = createLogger();

const storage = compose(
    filter(['devs', 'allowed_subs'])
)(adapter(window.localStorage));

const enhancer = compose(
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    ),
    persistState(storage, 'storage')
);


const store = createStore(devTrackerApp, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
