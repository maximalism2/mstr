'use strict';
var express = require('express');
var path = require('path');
var router = express.Router();
require("babel-register")({
  extensions: [".es6", ".es", ".jsx", ".js"]
});

import React from 'react';
import AppContainer from '../clients_source/container/mainContainer';
import { renderToString } from 'react-dom/server';
import configureStore from '../clients_source/store/';
import rootReducer from '../clients_source/reducers/';
import { Provider } from 'react-redux';

import {
  match, RouterContext, createMemoryHistory, createRoutes, Router
} from 'react-router';
// import { createLocation } from 'history';
import clientRoutes from '../clients_source/'




/* GET home page. */
router.get('/*+/', function(req, res, next) {
  let history = createMemoryHistory();
  const store = configureStore();

  let routes = createRoutes(history);
  let _history = require('history');
  let location = _history.createLocation(req.url);

  match({ routes: clientRoutes, location }, (error, redirectLocation, renderProps) => {
    // console.log(error, redirectLocation, renderProps);
    if (redirectLocation) {
    //   res.redirect(301, redirectLocation.pathname + redirectLocation.search)
    // } else if (error) {
    //   res.send(500, error.message)
    // } else if (renderProps == null) {
    //   res.send(404, 'Not found')
    // } else {
    //   res.json({ok: 200});
    }
  })


  const App = (
    <Provider store={store}>
      <Router history={history} routes={routes} />
    </Provider>
  );

  // console.log(renderToString(<App />));
  console.log('mathing in /')
  let pathToIndex = path.resolve(__dirname, '../public/index.html');
  res.sendFile(pathToIndex);
});

module.exports = router;
