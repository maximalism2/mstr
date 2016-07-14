import { combineReducers } from 'redux';
import prices from '../routes/prices/reducers';
import price from '../routes/price/reducers';
import newPrice from '../routes/prices/routes/new/reducers';
import notifications from '../common/notifications/reducers';
import loginReducers from '../routes/signin/reducers';
import commonView from '../common/reducers/common';
import registration from '../routes/signup/reducers';
import customerRegistration from '../routes/signup/routes/as-customer/reducers';

const rootReducer = combineReducers({
  prices,
  price,
  newPrice,
  notifications,
  commonView,
  login: loginReducers,
  registration,
  customerRegistration
});

export default rootReducer;
