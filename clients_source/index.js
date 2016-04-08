import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="center main-container">
        <h1 className="title is-1">Need to run</h1>
        <code className="npm-code">
          npm i --save
            history
            babel-polyfill
            moment
        </code>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);
