import { combineReducers } from 'redux';

const initialView = {
  loading: false,
  error: false,
};

function view(state = initialView, action) {
  return state;
}

const initialData = {};

function data(state = initialData, action) {
  return state;
}

const newPrice = combineReducers({
  view,
  data
});

export default newPrice;
