import firebase from 'firebase/app';
import 'firebase/firestore';
console.log(
  process.env.REACT_APP_FIREBASE_API_KEY,
  process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID
);
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'steele-secret-santa.firebaseapp.com',
  databaseURL: 'https://steele-secret-santa.firebaseio.com',
  projectId: 'steele-secret-santa',
  storageBucket: 'steele-secret-santa.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const firestoreSettings = {
  timestampsInSnapshots: true
};
firestore.settings(firestoreSettings);
export { firebase, firestore };
