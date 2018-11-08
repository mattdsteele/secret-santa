import { combineReducers } from 'redux';

export const actionNames = {
  SET_USERS: 'SET_USERS',
  SET_LISTS: 'SET_LISTS',
  SET_RELATIONSHIPS: 'SET_RELATIONSHIPS'
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case actionNames.SET_USERS:
      return {
        usersList: action.users,
        ...state
      };
    default: {
      return state;
    }
  }
};

const listReducer = (state = {}, action) => {
  switch (action.type) {
    case actionNames.SET_LISTS:
      return {
        all: action.lists
      };
    default: {
      return state;
    }
  }
};
const relationshipReducer = (state = {}, action) => {
  switch (action.type) {
    case actionNames.SET_RELATIONSHIPS:
      return {
        ...state,
        relationships: action.relationships
      };
    default: {
      return state;
    }
  }
};

const rootReducer = combineReducers({
  users: userReducer,
  lists: listReducer,
  relationships: relationshipReducer
});

export { rootReducer };
