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
export const saveRelationships = relationships => async dispatch => {
  console.log('checking relationships', relationships);
  const relationshipCollection = firestore.collection('relationships');
  for (let i = 0; i < relationships.length; i++) {
    const [person1, person2] = relationships[i];
    await relationshipCollection.add({
      person1: person1.uid,
      person2: person2.uid
    });
  }
};

export const getAllRelationships = () => async dispatch => {
  const relationshipsRef = await firestore.collection('relationships').get();
  if (relationshipsRef.empty) {
    console.log('empty list');
  } else {
    const relationships = [];
    relationshipsRef.forEach(list => relationships.push(list.data()));
    dispatch({ type: actionNames.SET_RELATIONSHIPS, relationships });
  }
};
