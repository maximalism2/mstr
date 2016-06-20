/*****  For routes *****/
// /****/ import PriceContainer from './container';
/****/
/****/
/****/
/******* end *********/

module.exports = {
  path: 'price/:id/',
  // component: PriceContainer,
  getComponent(location, cb) {
    require.ensure([], require => {
      cb(null, require('./container/').default);
    })
  }
}
