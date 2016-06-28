import React, { Component } from 'react';
import { render } from 'react-dom';
import reactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';

// import AppContainer from './container/mainContainer';
if (process.env.MSTR_ENV !== 'production') {
  require('babel-polyfill');
}

import configureStore from './store/';

let initialState = {};
if (typeof window !== 'undefined') {
  initialState = JSON.parse(JSON.stringify(decodeURI(window.__initialAppState__)));
}

const store = configureStore(initialState);
const history = /*syncHistoryWithStore(*/browserHistory/*, store)*/;



var App = () => (
  <Provider store={store}>
    {createRoutes(history)}
  </Provider>
);

// console.log(reactDOMServer.renderToString(App()));
// console.log(reactDOMServer.renderToStaticMarkup(App()));

if (process.env.MSTR_ENV !== 'production') {
  render(
    <App />,
    document.getElementById('root')
  )
} 

