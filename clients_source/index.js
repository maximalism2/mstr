import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import AppContainer from './container/mainContainer';
import 'babel-polyfill';

import configureStore from './store/'

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

var routes = {
    childRoutes: [{
      path: '/',
      component: AppContainer,
      getChildRoutes(location, callback) {
        console.log('require', require('./routes/prices'));
        require.ensure([], require => {
          callback(null, [
            require('./routes/prices'),
            // And so one
          ])
        });
      }
    },]
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {}
    }

    this.sendReq = this.sendReq.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  sendReq() {
    var xmlhttp = new XMLHttpRequest();
    let { path } = this.state;
    console.log('path', 'http://' + origin + '/' + path);
    xmlhttp.open('POST', `http://${origin}/${path}`, false);
    xmlhttp.send(JSON.stringify({
      name: 'Price from web',
      discount: 33
    }));
    if(xmlhttp.status >= 200 && xmlhttp.status < 300) {
      var data = JSON.parse(xmlhttp.responseText);
      console.log(data)
      this.setState({ data });
    }
  }

  changeHandler(e) {
    this.setState({
      path: e.target.value
    })
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);
