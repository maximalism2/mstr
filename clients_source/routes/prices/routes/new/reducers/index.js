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
  SHOW_LINK_TO_LOGIN
} from '../consts';
import {
  DELETE_NOTIFICATION
} from '../../../../../common/notifications/consts';

const initialPrice = {
  data: {
    name: '',
    currency: 'UAH',
    discount: 0,
    _id: '',
    products: []
  },
  view: {
    creatingLoading: false,
    creatingSuccess: false,
    creatingError: false,
    needToShowLoginLink: false
  },
  editMode: {
    id: null,
    field: '',
    hasError: false,
  }
}


function data(state = initialPrice.data, action) {
  switch (action.type) {
    case CHANGE_MAIN_FIELD_IN_NEW: {
      return Object.assign({}, state, {
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
    case CREATE_NEW_PRODUCT_IN_NEW: {
      let currentProducts = state.products;
      let firstProduct = currentProducts[currentProducts.length - 1];
      let newProductTemplate = {
        _id: Math.round(Math.random() * 1000000),
        name: '',
        unitOfMeasurement: '',
        cost: ''
      }
      if (firstProduct !== undefined) {
        newProductTemplate.name = firstProduct.name;
        newProductTemplate.unitOfMeasurement = firstProduct.unitOfMeasurement;
        newProductTemplate.cost = firstProduct.cost;
      }

      return Object.assign({}, state, {
        products: [...state.products, newProductTemplate]
      });
    }
    case REMOVE_NEW_PRODUCT_IN_NEW: {
      return Object.assign({}, state, {
        products: state.products.filter(product => product._id !== action.id)
      });
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
    case CREATING_LOADING: {
      return Object.assign({}, state, {
        loading: action.flag
      });
    }
    case PRICE_CREATING_SUCCESS: {
      return Object.assign({}, state, {
        creatingSuccess: true,
        creatingError: false
      });
    }
    case RESET_PRICE_VIEW_IN_NEW: {
      return Object.assign({}, state, initialPrice.view);
    }
    case DELETE_NOTIFICATION: {
      return Object.assign({}, state, {
        creatingError: false
      });
    }
    case PRICE_CREATING_ERROR: {
      return Object.assign({}, state, {
        creatingError: {
          status: action.status,
          message: action.message
        }
      });
    }
    case SHOW_LINK_TO_LOGIN: {
      return Object.assign({}, state, {
        needToShowLoginLink: true
      });
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
    case RESET_PRICE_VIEW_IN_NEW: {
      return Object.assign({}, state, initialPrice.editMode);
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
