import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { compose, createStore } from "redux";

import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import devTrackerApp from "./reducers/main-reducer";

import thunkMiddleware from "redux-thunk";
import { applyMiddleware } from "redux";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

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
