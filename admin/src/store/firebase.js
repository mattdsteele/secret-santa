import * as firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
console.log(
  process.env.REACT_APP_FIREBASE_API_KEY,
  process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID
);
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "steele-secret-santa.firebaseapp.com",
  databaseURL: "https://steele-secret-santa.firebaseio.com",
  projectId: "steele-secret-santa",
  storageBucket: "steele-secret-santa.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions();
export { firebase, db, db as firestore, functions, httpsCallable };
