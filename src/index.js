import React from 'react';
import ReactDOM from 'react-dom';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';

import createReducer from './reducer';
import { App } from './containers/app';
import { rootEpic } from './epics';

const DEBUG = true;

const reducer = createReducer();

const epicMiddleware = createEpicMiddleware();
const middleware = applyMiddleware(epicMiddleware);

let composeEnhancers, store;

if (DEBUG) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
} else {
    composeEnhancers = compose;
}
store = createStore(reducer, undefined, composeEnhancers(middleware));

epicMiddleware.run(rootEpic);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);