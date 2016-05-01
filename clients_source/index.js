import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import AppContainer from './container/mainContainer';
import 'babel-polyfill';

import configureStore from './store/';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

var routes = {
    childRoutes: [{
      path: '/',
      component: AppContainer,
      // Temp
      childRoutes: [
        require('./routes/prices/'),
        require('./routes/price/')
      ]
      // getChildRoutes(location, callback) {
      //   require.ensure([], function(require) {
      //     callback(null, [
      //       require('./routes/prices'),
      //       // And so one
      //     ])
      //   });
      // }
    },]
}


var App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

render(
  <App />,
  document.getElementById('root')
);
