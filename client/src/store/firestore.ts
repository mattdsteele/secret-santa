import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import 'firebase/storage';
import Vue from "vue";
import VueFire from "vuefire";
import { firebaseConfig, firestoreSettings } from "@/store/config";

import Component from "vue-class-component";
Component.registerHooks(["firestore"]);

Vue.use(VueFire);
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings(firestoreSettings);
const storage = firebase.storage();

export { firebase, db, storage };
