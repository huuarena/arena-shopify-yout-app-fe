import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import AppMain from './components/AppMain';

// API from redux createStore(<reducer>)
import { createStore, applyMiddleware } from 'redux';
// Component from react-redux help share store to all container components
import { Provider } from 'react-redux';
// Import the reducer function with arbitrary name
import rootReducer from './reducers';
// Import thunk
import thunk from 'redux-thunk';
// Import redux logger
// import { createLogger } from 'redux-logger'
// Shopify POLARIS UI provider
import { AppProvider } from '@shopify/polaris';
// Root State for App
import { initState } from './initState';

// const middlewares = [thunk, createLogger()]
const middlewares = [thunk];

const appStore = createStore(rootReducer, initState, applyMiddleware(...middlewares));

ReactDOM.render(
    <Provider store={appStore}>
        <AppProvider>
            <AppMain />
        </AppProvider>
    </Provider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
