import { combineReducers } from 'redux';

const fooReducer = (state = {}, action) => {
  return {
    foo: 'bar'
  };
};

const rootReducer = combineReducers({
  foo: fooReducer
});

export { rootReducer };
