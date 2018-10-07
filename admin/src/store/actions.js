import { firestore } from './firebase';

export const getUsers = () => async dispatch => {
  console.log('store', firestore);
  const list = await firestore
    .collection('list')
    .where('year', '==', 2018)
    .get();
  if (list.empty) {
    console.log('empty list');
  } else {
    const items = [];
    list.forEach(list => items.push(list.data()));
    console.log('my items', items);
  }
};
