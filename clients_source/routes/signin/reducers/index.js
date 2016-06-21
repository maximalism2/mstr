import {
  CHANGE_LOGIN_FORM_FIELD,
  LOGINING_LOADING,
  LOGINING_ERROR,
  LOGIN,
  TO_REGISTER,
  INPUT_VALIDATION_ERROR,
  RESET_VALIDATION_ERRORS
} from '../consts';

import { combineReducers } from 'redux';

const initialLoginState = {
  data: {
    login: '',
    password: ''
  },
  view: {
    loading: false,
    toRegister: false,
    errors: {
      loginingError: {
        error: false,
        message: ''
      },
      login: {
        error: false,
        message: ''
      },
      password: {
        error: false,
        message: ''
      },
    }
  }
}

function data(state = initialLoginState.data, action) {
  switch (action.type) {
    case CHANGE_LOGIN_FORM_FIELD: {
      return Object.assign({}, state, action.field);
    }
    default: {
      return state;
    }
  }
}

function view(state = initialLoginState.view, action) {
  switch (action.type) {
    case LOGINING_LOADING: {
      return Object.assign({}, state, {
        loading: action.flag
      });
    }
    case LOGINING_ERROR: {
      let newErrorsObject = Object.assign({}, state.errors, {
        loginingError: {
          error: true,
          message: action.message
        }
      });
      return Object.assign({}, state, {
        errors: newErrorsObject
      });
    }
    case INPUT_VALIDATION_ERROR: {
      let newErrorsObject = Object.assign({}, state.errors, {
        [action.field]: {
          error: true,
          message: action.message
        }
      });
      return Object.assign({}, state, {
        errors: newErrorsObject
      });
    }
    case RESET_VALIDATION_ERRORS: {
      return Object.assign({}, state, {
        errors: initialLoginState.view.errors
      });
    }
    default: {
      return state;
    }
  }
}

export default combineReducers({
  data,
  view
});