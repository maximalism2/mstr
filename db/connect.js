/**
 * Module exports function, which returns connection
 * to app's database;
 */
'use scrict';
var mongoose = require('mongoose');

var dbusername = 'mstradmin';
var dbpassword = 'chillozzie199max';
var origin = `mongodb://${dbusername}:${dbpassword}@ds011912.mlab.com:11912/maestro`;

var nenv = process.env.NODE_ENV;
// if (nenv && (nenv === 'development' || nenv === 'test')) {
//   origin = 'localhost'
// }

function connect(uri) {
  if (!uri) uri = origin;
  return mongoose.createConnection(uri);
}

module.exports = connect;
