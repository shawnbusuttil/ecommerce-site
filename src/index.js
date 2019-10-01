import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from "redux-thunk";

import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";

import cartReducer from "./store/cart/reducer";
import productsReducer from "./store/products/reducer";
import currencyReducer from "./store/currency/reducer";

import './index.scss';

import App from './App';

const appReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer,
    currency: currencyReducer
});

const appState = createStore(appReducer, applyMiddleware(thunkMiddleware));

const appWithStore = (
    <Provider store={appState}>
        <App />
    </Provider>
) 

ReactDOM.render(appWithStore, document.getElementById('root'));