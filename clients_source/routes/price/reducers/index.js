import { combineReducers } from 'redux';
import {
  FETCH_PRICE_BY_ID, FETCHING_LOADING, FBI_ERROR
} from '../consts';

const initialPrice = {
  data: {
    name: '',
    products: []
  },
  view: {
    error: false,
    loading: false
  }
}

function data(state = initialPrice.data, action) {
  switch (action.type) {
    case FETCH_PRICE_BY_ID: {
      return Object.assign({}, state, action.data);
    }
    default: {
      return state;
    }
  }
}

function view(state = initialPrice.view, action) {
  switch (action.type) {
    case FETCHING_LOADING: {
      return Object.assign({}, state, {
        loading: action.flag
      });
    }
    case FBI_ERROR: {
      return Object.assign({}, state, {
        error: true
      });
    }
    default: {
      return state;
    }
  }
}

const price = combineReducers({
  data,
  view
});

export default price;
