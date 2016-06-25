import React, { Component } from 'react';
import { render } from 'react-dom';
import reactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';

// import AppContainer from './container/mainContainer';
if (process.env.MSTR_ENV !== 'production') {
  require('babel-polyfill');
}

import configureStore from './store/';

const store = configureStore();
const history = /*syncHistoryWithStore(*/browserHistory/*, store)*/;



var App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
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

