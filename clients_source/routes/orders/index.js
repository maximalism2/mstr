module.exports = {
  path: 'orders/',
  getComponent(location, cb) {
    require.ensure([], require => {
      cb(null, require('./container/'));
    })
  }
}
