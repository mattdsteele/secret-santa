import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import Vue from "vue";
import VueFire from "vuefire";
import { firebaseConfig, firestoreSettings } from "@/store/config";

import Component from "vue-class-component";
Component.registerHooks(["firestore"]);

Vue.use(VueFire);
firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
db.settings(firestoreSettings);

export { firebase };
