import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import prices from '../routes/prices/reducers';
import newPrice from '../routes/prices/routes/new/reducers';

const rootReducer = combineReducers({
  prices,
  newPrice,
  routing: routerReducer
});

export default rootReducer;
