import { combineReducers } from 'redux';
import {
  FETCH_PRICE_BY_ID, FETCHING_LOADING, FBI_ERROR,
  EDIT_MODE_ON, EDIT_MODE_OFF,
  WILL_REMOVE, REMOVING_LOADING, REMOVE, REMOVE_ERROR, REMOVING_SUCCESS,
  RESET_PRICE_VIEW,
  MAKE_INPUT, REMOVE_INPUT, CHANGE_PRODUCT_FIELD
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
  },
  editMode: {
    id: null,
    field: '',
    data: []
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

function editMode(state = initialPrice.editMode, action) {
  switch (action.type) {
    case EDIT_MODE_ON: {
      return Object.assign({}, state, {
        data: JSON.parse(JSON.stringify(action.data))
      });
    }
    case EDIT_MODE_OFF: {
      return Object.assign({}, state, {
        data: {}
      });
    }
    case CHANGE_PRODUCT_FIELD: {
      if (action.id) {
        let productIsNotChangedJet = true;
        let newProducts = state.data.products.map(changedField => {
          if (changedField._id && changedField._id === action.id) {
            return Object.assign({}, changedField, {
              [action.field]: action.value
            });
          } else {
            return changedField;
          }
        });
        let newData = JSON.parse(JSON.stringify(state.data));
        newData.products = newProducts;
        return Object.assign({}, state, {
          data: newData
        });
      } else if (action.field === 'priceTitle') {
        return Object.assign({}, state, {
          name: action.value
        });
      } else if (action.field === 'discount') {
        return Object.assign({}, state, {
          discount: action.value
        });
      } else {
        return state;
      }
    }
    case MAKE_INPUT: {
      return Object.assign({}, state, {
        id: action.id,
        field: action.field
      });
    }
    case REMOVE_INPUT: {
      return Object.assign({}, state, {
        id: null,
        field: null
      });
    }
    default: {
      return state;
    }
  }
}

const price = combineReducers({
  data,
  view,
  editMode
});

export default price;
