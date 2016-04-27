// With redux Logger
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import rootReducer from '../reducers';
import { CHANGE_FIELD } from '../routes/prices/routes/new/consts/';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger({
  predicate: (getState, action) => action.type !== CHANGE_FIELD,
  collapsed: true,
  duration: true,
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}
