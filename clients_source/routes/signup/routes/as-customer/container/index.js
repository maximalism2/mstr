import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class AsCustomerContainer extends Component {
  render() {
    return (
      <div>
        <Link
          to="/registration/"
          className="cancel-registration-btn"
        >⨉</Link>
        <form action="/api/registration/">
          <div className="controls">
            <input
              type="text"
              name="firstName"
              className="input first-name-input"
              placeholder={"Ім’я"}
            />
            <input
              type="text"
              name="secondName"
              className="input second-name-input"
              placeholder="Прізвище"
            />
          </div>
          <div className="controls">
            <input
              type="email"
              name="email"
              className="input email-input"
              placeholder="Електронна адреса"
            />
          </div>
          <div className="controls">
            <input
              type="password"
              name="password"
              className="input password-input"
              placeholder="Пароль"
            />
          </div>
          <div className="controls">
            <button
              type="submit"
              className="button is-primary send-button"
            >
              Зареєструватися
            </button>
          </div>
        </form>
      </div>
    );
  }
}

function select(state) {
  return {};
}

AsCustomerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(select)(AsCustomerContainer);