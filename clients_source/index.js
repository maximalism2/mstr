import React, { Component } from 'react';
import 'babel-polyfill';
import { render } from 'react-dom';

function fetchB() {
  let url = `/getpricesnumber`;
  const response = fetch(url, { method: 'post' });

  return response
    .then(data => {
      if (data.ok) {
        const details = data.json();
        return details;
      }
      else {
        return null;
      }
    });
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
    console.log(this);
    let { path } = this.state;
    console.log('path', path);
    xmlhttp.open('POST', `http://localhost:3000/${path}`, false);
    xmlhttp.send(null);
    if(xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
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
      <div className="container main-container">
        {/*}<h1 className="title is-3 main-title">Maestro <small>(Alpha)</small></h1>*/}
        <h1 className="title is-3 main-title">Data: {this.state.data.url}</h1>
        <div className="column is-4 is-offset-4 form-wrapper">
          <p className="login-input">
            <input
              className="input"
              onChange={e => this.changeHandler(e)}
              type="text"
              placeholder="email or username"
            />
          </p>
          <button
            className="button is-primary"
            onClick={() => this.sendReq()}
          >Send</button>
          {" "}
          <a className="button is-link sign-up-link">Sign up</a>
        </div>
        <footer className="footer">
          <div className="container">
            <div className="content is-centered">
              <p>
                <strong>Maestro</strong> by <a href="http://github.com/necinc">Max Vyznyuk</a>. The source code is licensed
                <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

render(
  <App />,
  document.getElementById('root')
);
