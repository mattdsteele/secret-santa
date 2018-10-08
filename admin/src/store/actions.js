import { firestore } from './firebase';
import { actionNames } from './reducers';

export const getUsers = () => async dispatch => {
  const usersRef = await firestore.collection('users').get();
  if (usersRef.empty) {
    console.log('empty list');
  } else {
    const users = [];
    usersRef.forEach(list => users.push(list.data()));
    dispatch({ type: actionNames.SET_USERS, users });
  }
};

export const getAllLists = () => async dispatch => {
  const listsRef = await firestore.collection('list').get();
  if (listsRef.empty) {
    console.log('empty list');
  } else {
    const lists = [];
    listsRef.forEach(list => lists.push(list.data()));
    dispatch({ type: actionNames.SET_LISTS, lists });
  }
};
