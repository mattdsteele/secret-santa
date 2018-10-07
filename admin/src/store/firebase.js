import firebase from 'firebase';

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'steele-secret-santa.firebaseapp.com',
  databaseURL: 'https://steele-secret-santa.firebaseio.com',
  projectId: 'steele-secret-santa',
  storageBucket: 'steele-secret-santa.appspot.com',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID
};

export { firebase };
