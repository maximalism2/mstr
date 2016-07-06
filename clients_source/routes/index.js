import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';


/*
  I don't know how to reder 
*/

if (process.env.MSTR_ENV === 'production') {
  module.exports = function(history) {
    return (
      <Router history={history}>
        <Route path="/" component={require('../container/mainContainer').default}>
          <Route path="prices/" component={require('./prices/container').default} />
          <Route path="price/" component={require('./price/container').default} />
          <Route path="price/:priceID/" component={require('./price/container').default} />
          <Route path="orders/" component={require('./orders/container').default} />
          <Route path="login/" component={require('./signin/container').default} />
        </Route>
        <IndexRoute component={require('../container/mainContainer').default} />
      </Router>
    );
  }
} else {
  let routes = {
    component: 'div',
    childRoutes: [{
      path: '/',
      getComponent(location, callback) {
        require.ensure([], function(require) {
          callback(null, require('../container/mainContainer').default);
        });
      },
      getChildRoutes(location, callback) {
        require.ensure([], function(require) {
          callback(null, [
            require('./prices/'),
            require('./price/'),
            require('./orders/')
            // And so one
          ]);
        });
      }
    },{
      path: '/login',
      getComponent(location, callback) {
        require.ensure([], require => {
          callback(null, require('./signin/container/').default);
        });
      }
    }]
  }

  module.exports =  function(history) {
    return (
      <Router history={history} routes={routes} />
    );
  }
}