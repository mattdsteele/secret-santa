declare var process: any;

export const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "steele-secret-santa.firebaseapp.com",
  databaseURL: "https://steele-secret-santa.firebaseio.com",
  projectId: "steele-secret-santa",
  storageBucket: "steele-secret-santa.appspot.com",
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID
};

export const firestoreSettings = {
  timestampsInSnapshots: true
};
