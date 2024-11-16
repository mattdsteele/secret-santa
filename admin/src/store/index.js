import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { thunk } from "redux-thunk";
import { rootReducer } from './reducers';
const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  {},
  composeEnhancers(compose(applyMiddleware(thunk, logger)))
);

export { store };
