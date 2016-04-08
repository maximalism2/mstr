module.exports = {
  path: 'prices/:query/',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./container/'))
    })
  }
}

/*
module.exports = {
  path: 'job/:jobID',
  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('./container/'))
    })
  }
}
*/
