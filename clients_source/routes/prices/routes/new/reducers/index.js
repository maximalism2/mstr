import { combineReducers } from 'redux';
import {
  CHANGE_FIELD, ADD_ROW, REMOVE_ROW, NEW_PRICE_LOADING, MAKE_INPUT
} from '../consts';

const initialView = {
  loading: false,
  error: false,
  inputIndex: -1,
};

function view(state = initialView, action) {
  switch (action.type) {
    case MAKE_INPUT: {
      return Object.assign({}, state, {
        inputIndex: action.index
      });
    }
    case NEW_PRICE_LOADING: {
      return Object.assign({}, state, {
        loading: action.flag
      });
    }
    default: {
      return state;
    }
  }
}

const initialData = {
  name: '',
  discount: Number(''),
  products: [{
    name: 'труба пупік',
    unitOfMeasurement: 'm',
    cost: 233
  },{
    name: 'труба секонд хенд',
    unitOfMeasurement: 'm',
    cost: 120
  },{
    name: 'труба валмарт',
    unitOfMeasurement: 'm',
    cost: 32.4
  },{
    name: 'труба секонд хенд',
    unitOfMeasurement: 'm',
    cost: 120
  },{
    name: 'труба валмарт',
    unitOfMeasurement: 'm',
    cost: 32.4
  },{
    name: 'труба секонд хенд',
    unitOfMeasurement: 'm',
    cost: 120
  },{
    name: 'труба валмарт',
    unitOfMeasurement: 'm',
    cost: 32.4
  },{
    name: 'труба секонд хенд',
    unitOfMeasurement: 'm',
    cost: 120
  },{
    name: 'труба валмарт',
    unitOfMeasurement: 'm',
    cost: 32.4
  },{
    name: 'труба секонд хенд',
    unitOfMeasurement: 'm',
    cost: 120
  },{
    name: 'труба валмарт',
    unitOfMeasurement: 'm',
    cost: 32.4
  },]
};

const initialProductModel = {
  name: '',
  unitOfMeasurement: '',
  cost: ''
}

function data(state = initialData, action) {
  switch (action.type) {
    case CHANGE_FIELD: {
      return Object.assign({}, state, action.field);
    }
    case ADD_ROW: {
      let newProductsList = state.products;
      newProductsList.unshift(action.row);
      return Object.assign({}, state, {
        products: newProductsList
      });
    }
    case REMOVE_ROW: {
      let newProductsList = state.products.filter((item, index) => {
        return index !== actions.index
      });
      return Object.assign({}, state, {
        products: newProductsList
      });
    }
    default: {
      return state;
    }
  }
}

const newPrice = combineReducers({
  view,
  data
});

export default newPrice;
