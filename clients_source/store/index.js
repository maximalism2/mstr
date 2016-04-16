// With redux Logger
import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import rootReducer from '../reducers';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

const loggerMiddleware = createLogger({
  collapsed: true,
  duration: true,
});

const appReducer = combineReducers({
  ...rootReducer,
  routing: routerReducer
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(appReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}
