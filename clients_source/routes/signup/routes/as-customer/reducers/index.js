import { combineReducers } from 'redux';
import {
  IS_VALUE_UNIQUE,
  UNIQUENESS_ERROR,
  CHECKING_LOADING_IN_CUSTOMER_FIELD,
  CHANGE_FILED_AS_CUSTOMER,
  VALIDATION_ERROR,
  VALIDATION_SUCCESS
} from '../consts'
import { fieldsIds } from '../consts';

const initialRegisterFormAsCustomer =  {
  data: {
    username: '',
    email: '',
    password: '',
  },
  view: {
    validation: {
      inProcess: [],
      success: [],
      error: [],
      messages: {}
    },
    loading: false
  }
}

function data(state = initialRegisterFormAsCustomer.data, action) {
  switch (action.type) {
    case CHANGE_FILED_AS_CUSTOMER: {
      /**
       * TODO
       * need to create change field reducer and other smaller reducers
       */
      return  state;
    }
    default: {
      return state;
    }
  }
}

function view(state = initialRegisterFormAsCustomer.view, action) {
  switch (action.type) {
    case 1: {
      return state;
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