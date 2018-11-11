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
export const saveYearPairings = (year, pairings) => async dispatch => {
  const yearCollection = firestore.collection('pairings');
  for (let i = 0; i < pairings.length; i++) {
    const [gifter, giftee] = pairings[i];
    console.log('saving pairing', gifter, giftee);
    await yearCollection.add({
      year,
      gifter: gifter.uid,
      giftee: giftee.uid
    });
  }
};

export const getAllPairings = () => async dispatch => {
  const relationshipsRef = await firestore
    .collection('pairings')
    .orderBy('year', 'asc')
    .get();
  if (relationshipsRef.empty) {
    console.log('empty list');
  } else {
    const pairings = [];
    relationshipsRef.forEach(list => pairings.push(list.data()));
    dispatch({ type: actionNames.SET_PAIRINGS, pairings });
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
export const saveNewYear = (newPairings, year) => async dispatch => {
  const pairings = newPairings.map(({ gifter, giftee }) => {
    return [{ uid: gifter }, { uid: giftee }];
  });
  console.log('pairings to do', pairings);
  dispatch(saveYearPairings(year, pairings));
};
