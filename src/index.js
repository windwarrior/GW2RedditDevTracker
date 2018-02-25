import React from "react";
import ReactDOM from "react-dom";

import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";

import thunkMiddleware from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import devTrackerApp from "./reducers/main-reducer";


import registerServiceWorker from "./registerServiceWorker";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

const persistConfig = {
    key: "storage",
    storage,
    blacklist: ["currently_fetching"]
};

const persistedReducer = persistReducer(persistConfig, devTrackerApp);

const enhancer = compose(applyMiddleware(thunkMiddleware));

const store = createStore(persistedReducer, enhancer);
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<div> Loading... </div>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);

registerServiceWorker();
