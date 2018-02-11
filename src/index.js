import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore } from 'redux'

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import devTrackerApp from './reducers/main-reducer';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { applyMiddleware } from 'redux';

let loggerMiddleware = createLogger();

let store = createStore(
    devTrackerApp,
    applyMiddleware(
        thunkMiddleware,
//        loggerMiddleware
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();
