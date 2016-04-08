import React, { Component, PropTypes } from 'react';
import { Router } from 'react-router';
import { createHistory } from 'history';

var history = createHistory();

var routes = {
  childRoutes: [{
    path: '/prices/',
    component: require('./prices/')
  },]
  //{
  //   path: '*',
  //   component: require('./prices/')
  // }]
}

export default class AppRouter extends Component {
  render() {
    return (
      <Router history={history} routes={routes}>
    );
  }
}
