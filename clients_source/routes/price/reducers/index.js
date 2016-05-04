import { combineReducers } from 'redux';
import {
  FETCH_PRICE_BY_ID, FETCHING_LOADING, FBI_ERROR,
  EDIT_MODE_ON, EDIT_MODE_OFF,
  WILL_REMOVE, REMOVING_LOADING, REMOVE, REMOVE_ERROR, REMOVING_SUCCESS,
  RESET_PRICE_VIEW
} from '../consts';

const initialPrice = {
  data: {
    name: '',
    products: []
  },
  view: {
    error: false,
    loading: false,
    editMode: false,
    willRemove: false,
    removingLoading: false,
    removingSuccess: false
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
    case EDIT_MODE_ON: {
      return Object.assign({}, state, {
        editMode: true
      });
    }
    case EDIT_MODE_OFF: {
      return Object.assign({}, state, {
        editMode: false
      });
    }
    case WILL_REMOVE: {
      return Object.assign({}, state, {
        willRemove: action.flag
      });
    }
    case REMOVING_LOADING: {
      return Object.assign({}, state, {
        removingLoading: action.flag
      });
    }
    case REMOVING_SUCCESS: {
      return Object.assign({}, state, {
        removingSuccess: true
      });
    }
    case RESET_PRICE_VIEW: {
      return Object.assign({}, state, initialPrice.view);
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
