module.exports = {
  path: 'prices/',
  getComponent(location, cb) {
    require.ensure([], require => {
      cb(null, require('./container/'));
    })
  }
}
