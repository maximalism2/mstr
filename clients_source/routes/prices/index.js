/*****  For routes *****/
/****/ import PricesContainer from './container';
/****/
/****/
/****/
/******* end *********/

module.exports = {
  path: 'prices',
  // component: PricesContainer,
  childRoutes: [
    require('./routes/new/')
  ],
  getComponent(location, cb) {
    require.ensure([], require => {
      cb(null, require('./container/'));
    })
  }
}
