import React, { Component, PropTypes } from 'react';

class LoginForm extends Component {
  constructor() {
    super();

    this.submitHandler = this.submitHandler.bind(this);
    this.hasError = this.hasError.bind(this);
  }

  submitHandler(e) {
    e.preventDefault();

    let { login, password } = e.target.elements

    let loginHasError = this.hasError({
      field: 'login',
      value: login.value
    });
    let passwordHasError = this.hasError({
      field: 'password',
      value: password.value
    });

    if (loginHasError || passwordHasError) {
      return;
    } else {
      this.props.actions.login({
        login: login.value,
        password: password.value
      });
    }
  }

  hasError(check) {
    switch (check.field) {
      case 'login': {
        if (!check.value.length) {
          this.props.actions.validationError('login', 'Це поле повинне бути заповнене');
          return true;
        } else {
          return false;
        }
      }
      case 'password': {
        if (!check.value.length) {
          this.props.actions.validationError('password', 'Це поле повинне бути заповнене');
          return true;
        } else {
          return false;
        }
      }
    }
  }

  render() {
    let { actions, login } = this.props;

    return (
      <form
        action="/api/login/"
        method="POST"
        onSubmit={e => this.submitHandler(e)}
      >
        <div className="inputs-box">
          <input
            type="text"
            name="login"
            className="input"
            placeholder="email або номер телефону"
            value={login.data.login}
            onChange={e => actions.changeLoginFormField({
              login: e.target.value
            })}
            onBlur={e => this.hasError({
              field: 'login',
              value: e.target.value
            })}
          />
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Пароль"
            value={login.data.password}
            onChange={e => actions.changeLoginFormField({
              password: e.target.value
            })}
            onBlur={e => this.hasError({
              field: 'password',
              value: e.target.value
            })}
          />
          <div className="button-box">
            <button
              className="button is-primary login-button"
              type="submit"
            >Увійти</button>
            <span className="divider"> або </span>
            <button className="button is-primary is-outlined">Зареєструватися</button>
          </div>
        </div>
      </form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default LoginForm;