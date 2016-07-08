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
import renderFullPage from './helpers/renderFullPage';

import { createMemoryHistory, useQueries } from 'history';
import {
  match, RouterContext, Router, useRouterHistory
} from 'react-router';
import createRoutes from '../clients_source/routes';

/* GET home page. */

router.get('*', function(req, res, next) {
  let history = useRouterHistory(useQueries(createMemoryHistory))();
  const store = configureStore();

  let userAuthenticated = req.isAuthenticated();
  console.log('\n\n\n')
  console.log('req.isAuthenticated()', userAuthenticated, req.url);
  if (req.url === '/') {
    if (!userAuthenticated) {
      res.sendFile(path.resolve(__dirname, '../public/htmlsrc/home.html'));
    }
  }

  if (userAuthenticated || (req.url === '/login/' || req.url === '/registration/')) {
    let routes = createRoutes(history);
    let location = history.createLocation(req.url);

    match({ routes, location, history }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.status(500).send(error.message);
      } else if (renderProps == null) {
        // res.send(404, 'Not found')
      } else {
        let reduxState = encodeURI(JSON.stringify(store.getState()));
        let html = renderToString(
          <Provider store={store}>
            { <RouterContext {...renderProps}/> }
          </Provider>
        );
        console.log('here it will be send response');
        res.send(renderFullPage(html, reduxState));
      }
    })
  } else {
    res.redirect('/');
    // res.sendFile(path.resolve(__dirname, '../public/htmlsrc/home.html'));
  }
});

module.exports = router;
