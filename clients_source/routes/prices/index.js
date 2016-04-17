/*****  For routes *****/
/****/ import PricesContainer from './container';
/****/
/****/
/****/
/******* end *********/

module.exports = {
  path: 'prices',
  component: PricesContainer
  // getComponent(location, cb) {
  //   require.ensure([], require => {
  //     cb(null, require('./container/'));
  //   })
  // }
}
