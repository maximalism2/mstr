export default {
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