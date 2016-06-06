import React, { Component } from 'react';
import { render } from 'react-dom';
import reactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// import AppContainer from './container/mainContainer';
import 'babel-polyfill';

import configureStore from './store/';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

var routes = {
  component: 'div',
  childRoutes: [{
    path: '/',
    getComponent(location, callback) {
      console.log('get component');
      require.ensure([], function(require) {
        callback(null, require('./container/mainContainer').default)
      });
    },
    getChildRoutes(location, callback) {
      require.ensure([], function(require) {
        callback(null, [
          require('./routes/prices'),
          require('./routes/price/')
          // And so one
        ]);
      });
    }
  }]
}


var App = () => (
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
);

// console.log(reactDOMServer.renderToString(App()));
// console.log(reactDOMServer.renderToStaticMarkup(App()));

render(
  <App />,
  document.getElementById('root')
)

