/**
 * Module exports function, which returns connection
 * to app's database;
 */

var mongoose = require('mongoose');
const origin = 'localhost';
const dbName = 'maestro';

function connect(url, name) {
  if (!url) url = origin;
  if (!name) name = dbName;
  return mongoose.createConnection(url, name);
}

module.exports = connect;
