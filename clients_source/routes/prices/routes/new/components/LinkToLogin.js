import React, { Component } from 'react';
import { Link } from 'react-router';

class LinkToLogin extends Component {
  render() {
    return (
      <div className="message is-danger message-to-login content-container">
        <div className="message-body">
          <p>Щоб увійти перейдіть за цим <Link to="/login/">посиланням</Link></p>
        </div>
      </div>
    );
  }
}

export default LinkToLogin;