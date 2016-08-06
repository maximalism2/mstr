import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { TextInput } from '../components';
import * as actions from '../actions';
import { fieldsIds } from '../consts';

class AsCustomerContainer extends Component {
  constructor(...args) {
    super(...args);

    this.changeHandler = this.changeHandler.bind(this);
    this.usernameBlurhandler = this.usernameBlurhandler.bind(this);
  }

  check(field, value) {
    this.props.dispatch(actions.isValueUnique(field, value));
  }

  blurHandler(e) {
    if (e.target.value.length) {
      this.check('username', e.target.value);
    }
  }

  hasFieldError(fieldId) {
    let form = this.props.customerRegistration;
    let validator = form.view.validation;

    let errorDetected = validator.error.indexOf(fieldId) !== -1;
    if (errorDetected) {
      return {
        error: true,
        message: validator.message[fieldId]
      }
    } else {
      let mayFieldSuccessed = validator.success.indexOf(fieldId) !== -1;
      if (mayFieldSuccessed) {
        return {
          realyFieldIsSuccessed: true
        }
      } else {
        return false;
      }
    }
  }

  changeHandler(field, value) {
    this.props.dispatch(actions.changeField(field, value));
  }

  usernameBlurhandler(e) {
    console.log(e.target.value.length);
  }

  submitHandler(e) {
    e.preventDefault();
    let { dispatch, customerRegistration } = this.props;
    dispatch(actions.register(customerRegistration.data));
  }

  render() {
    let form = this.props.customerRegistration;

    let usernameError = this.hasFieldError(fieldsIds.username);
    let emailError = this.hasFieldError(fieldsIds.email);
    let passwordError = this.hasFieldError(fieldsIds.password);

    return (
      <div>
        <Link
          to="/registration/"
          className="cancel-registration-btn"
        >⨉</Link>
        <form action="/api/registration/" onSubmit={e =>this.submitHandler(e)}>
          <TextInput
            type="text"
            name="username"
            placeholder="Ім’я користувача (наприклад slava555)"
            value={form.data.username}
            onChange={this.changeHandler}
            validationError={usernameError}
            onBlur={this.usernameBlurhandler}
          />
          <div className="controls">
            <TextInput
              type="email"
              name="email"
              placeholder="Електронна пошта"
              value={form.data.email}
              onChange={this.changeHandler}
              validationError={emailError}
              // onBlur={this.usernameBlurhandler}
            />
          </div>
          <div className="controls">
            <TextInput
              type="password"
              name="password"
              placeholder="Пароль"
              value={form.data.password}
              onChange={this.changeHandler}
              validationError={passwordError}
              // onBlur={this.usernameBlurhandler}
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
  return {
    customerRegistration: state.customerRegistration
  };
}

AsCustomerContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect(select)(AsCustomerContainer);