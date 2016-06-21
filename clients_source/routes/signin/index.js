module.exports = {
  path: '/',
  // component: PriceContainer,
  getComponent(location, cb) {
    require.ensure([], require => {
      cb(null, require('./container/').default);
    })
  }
}
