import { combineReducers } from 'redux';
import {
  FETCH_PRICE_BY_ID, FETCHING_LOADING, FBI_ERROR,
  EDIT_MODE_ON, EDIT_MODE_OFF,
  WILL_REMOVE, REMOVING_LOADING, REMOVE, REMOVE_ERROR, REMOVING_SUCCESS,
  RESET_PRICE_VIEW,
  MAKE_INPUT, REMOVE_INPUT, CHANGE_PRODUCT_FIELD, CHANGE_MAIN_FIELD,
  INPUT_INSERT_ERROR,
  CREATE_NEW_PRODUCT, REMOVE_NEW_PRODUCT,
  REMOVE_PRODUCT, CANCEL_REMOVING_PRODUCT,
  UPDATING_LOADING, PRICE_UPDATING_ERROR, PRICE_UPDATING_SUCCESS,
  SET_COUNTERS
} from '../consts';

import {
  PRICE_CREATING_SUCCESS
} from '../../prices/routes/new/consts';

const initialPrice = {
  data: {
    name: '',
    currency: 'UAH',
    discount: 0,
    updatedAt: new Date(),
    products: []
  },
  view: {
    error: false,
    loading: false,
    editMode: false,
    willRemove: false,
    removingLoading: false,
    removingSuccess: false,
    updatingLoading: false,
    updatingSuccess: false
  },
  editMode: {
    id: null,
    field: '',
    hasError: false,
    data: {},
    productsWillRemove: [],
    counters: {
      created: 0,
      removed: 0,
      updated: 0
    }
  }
}

function data(state = initialPrice.data, action) {
  switch (action.type) {
    case FETCH_PRICE_BY_ID: {
      return Object.assign({}, state, action.data);
    }
    case PRICE_UPDATING_SUCCESS: {
      return Object.assign({}, state, action.data);
    }
    case PRICE_CREATING_SUCCESS: {
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
    case UPDATING_LOADING: {
      return Object.assign({}, state, {
        updatingLoading: action.flag
      });
    }
    case PRICE_UPDATING_SUCCESS: {
      return Object.assign({}, state, {
        updatingSuccess: true
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
        data: {},
        productsWillRemove: []
      });
    }
    case CHANGE_MAIN_FIELD: {
      let newMainData = Object.assign({}, state.data, {
        [action.field]: action.value
      });
      return Object.assign({}, state, {
        data: newMainData
      });
    }
    case CHANGE_PRODUCT_FIELD: {
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
    case INPUT_INSERT_ERROR: {
      return Object.assign({}, state, {
        hasError: action.flag
      });
    }
    case REMOVE_PRODUCT: {
      return Object.assign({}, state, {
        productsWillRemove: [
          ...state.productsWillRemove,
          action.id
        ]
      });
    }
    case CREATE_NEW_PRODUCT: {
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
    case REMOVE_NEW_PRODUCT: {
      let newData = Object.assign({}, state.data, {
        products: state.data.products.filter(product => product._id !== action.id)
      });
      return Object.assign({}, state, {
        data: newData
      });
    }
    case CANCEL_REMOVING_PRODUCT: {
      let newPWR = state.productsWillRemove.filter(id => id !== action.id);
      return Object.assign({}, state, {
        productsWillRemove: newPWR
      });
    }
    case RESET_PRICE_VIEW: {
      return Object.assign({}, state, {
        hasError: false
      });
    }
    case SET_COUNTERS: {
      return Object.assign({}, state, {
        counters: action.counters
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
