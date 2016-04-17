import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import prices from '../routes/prices/reducers';

const rootReducer = combineReducers({
  prices,
  routing: routerReducer
});

export default rootReducer;
