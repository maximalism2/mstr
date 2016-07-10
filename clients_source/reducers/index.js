import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import prices from '../routes/prices/reducers';
import price from '../routes/price/reducers';
import newPrice from '../routes/prices/routes/new/reducers';
import notifications from '../common/notifications/reducers';
import loginReducers from '../routes/signin/reducers';
import commonView from '../common/reducers/common';

const rootReducer = combineReducers({
  prices,
  price,
  newPrice,
  notifications,
  commonView,
  login: loginReducers,
  routing: routerReducer
});

export default rootReducer;
