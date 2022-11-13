import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/remote-config';
import Vue from 'vue';
import { firestorePlugin } from 'vuefire';

import store from '../store';

import { firebaseConfig, firestoreSettings } from '@/store/config';

import Component from 'vue-class-component';
Component.registerHooks(['firestore']);

Vue.use(firestorePlugin);
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
db.settings(firestoreSettings);
const storage = firebase.storage();

// Remote config setting
const remoteConfig = firebase.remoteConfig();
remoteConfig.settings.minimumFetchIntervalMillis = 100_000;
remoteConfig.defaultConfig = {
    editMode: true
};

remoteConfig.fetchAndActivate().then(fulfilled => {
    if (fulfilled) {
        const editModeValue = remoteConfig.getValue('editMode');
        const emv = editModeValue.asBoolean();
        store.dispatch('list/setListEditMode', emv);
    }
})

export { firebase, db, storage, remoteConfig };

