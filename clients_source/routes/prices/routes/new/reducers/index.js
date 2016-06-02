import { combineReducers } from 'redux';
import {
  MAKE_INPUT_IN_NEW, REMOVE_INPUT_IN_NEW,
  CHANGE_PRODUCT_FIELD_IN_NEW, CHANGE_MAIN_FIELD_IN_NEW,
  INPUT_INSERT_ERROR_IN_NEW,
  CREATE_NEW_PRODUCT_IN_NEW, REMOVE_NEW_PRODUCT_IN_NEW,
  CREATING_LOADING,
  PRICE_CREATING_ERROR,
  PRICE_CREATING_SUCCESS,
  RESET_PRICE_VIEW_IN_NEW,
  SET_COUNTERS_IN_NEW
} from '../consts';

const initialPrice = {
  data: {
    name: '',
    currency: 'UAH',
    discount: 0,
    products: []
  },
  view: {
    creatingLoading: false,
    creatingSuccess: false,
    creatingError: false
  },
  editMode: {
    id: null,
    field: '',
    hasError: false,
    counters: {
      created: 0
    }
  }
}


function data(state = initialPrice.data, action) {
  switch (action.type) {
    case CHANGE_MAIN_FIELD_IN_NEW: {
      return Object.assign({}, state.data, {
        [action.field]: action.value
      });
    }
    case CHANGE_PRODUCT_FIELD_IN_NEW: {
      let productIsNotChangedJet = true;
      let newProducts = state.products.map(changedField => {
        if (changedField._id && changedField._id === action.id) {
          return Object.assign({}, changedField, {
            [action.field]: action.value
          });
        } else {
          return changedField;
        }
      });
      return Object.assign({}, state, {
        products: newProducts
      });
    }
    default: {
      return state;
    }
  }
}

function view(state = initialPrice.view, action) {
  switch (action.type) {
    case CREATING_LOADING: {
      return Object.assign({}, state, {
        loading: action.flag
      });
    }
    case PRICE_CREATING_SUCCESS: {
      return Object.assign({}, state, {
        updatingSuccess: true
      });
    }
    case RESET_PRICE_VIEW_IN_NEW: {
      return Object.assign({}, state, initialPrice.view);
    }
    default: {
      return state;
    }
  }
}

function editMode(state = initialPrice.editMode, action) {
  switch (action.type) {
    case MAKE_INPUT_IN_NEW: {
      return Object.assign({}, state, {
        id: action.id,
        field: action.field
      });
    }
    case REMOVE_INPUT_IN_NEW: {
      return Object.assign({}, state, {
        id: null,
        field: null
      });
    }
    case INPUT_INSERT_ERROR_IN_NEW: {
      return Object.assign({}, state, {
        hasError: action.flag
      });
    }
    case CREATE_NEW_PRODUCT_IN_NEW: {
      let currentProducts = state.data.products;
      let firstProduct = currentProducts[currentProducts.length - 1];
      let newProductTemplate = {
        _id: Math.round(Math.random() * 1000000),
        name: '',
        unitOfMeasurement: '',
        cost: '',
        new: true
      }
      if (firstProduct !== undefined) {
        newProductTemplate.name = firstProduct.name;
        newProductTemplate.unitOfMeasurement = firstProduct.unitOfMeasurement;
        newProductTemplate.cost = firstProduct.cost;
      }

      let newProducts = [...state.data.products, newProductTemplate];

      let newData = Object.assign({}, state.data, {
        products: newProducts
      });

      return Object.assign({}, state, {
        data: newData
      });
    }
    case REMOVE_NEW_PRODUCT_IN_NEW: {
      let newData = Object.assign({}, state.data, {
        products: state.data.products.filter(product => product._id !== action.id)
      });
      return Object.assign({}, state, {
        data: newData
      });
    }
    case RESET_PRICE_VIEW_IN_NEW: {
      return Object.assign({}, state, {
        hasError: false
      });
    }
    case SET_COUNTERS_IN_NEW: {
      return Object.assign({}, state, {
        counters: action.counters
      });
    }
    default: {
      return state;
    }
  }
}

const newPrice = combineReducers({
  data,
  view,
  editMode
});

export default newPrice;
