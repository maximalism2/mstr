import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SignUpContainer extends Component {
  render() {
    return (
      <div className="register-page">
        <h2 className="motivation-to-register">
          Долучайтесь до команди професійних<br />
          майстрів з усієї країни на <span className="site-name">mstr</span>
        </h2>

        <div className="registration-form-box">в</div>
      </div>
    );
  }
}

function select(state) {
  return {
    registration: state.registration,
  }
}

export default connect(select)(SignUpContainer);