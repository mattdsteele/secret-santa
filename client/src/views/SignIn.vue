<template>
  <div id="auth"></div>
</template>
<script lang="ts">
import Vue from 'vue';
import firebaseui from 'firebaseui';
import { firebase } from '@/store/firestore';
import Component from 'vue-class-component';
import { Action, namespace } from 'vuex-class';

const login = namespace('login');
@Component
export default class HelloWorld extends Vue {
  @login.Action('doLogin')
  private loginAction: any;
  private mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    this.loginFn();
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '#/list',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    ui.start('#auth', uiConfig);
  }
  private loginFn() {
    const auth = firebase.auth();
    auth.onAuthStateChanged(async user => {
      if (user) {
        const { newUser } = await this.loginAction(user);
        console.log('logged in');
        if (newUser) {
          this.$router.push('register');
        } else {
          this.$router.push('list');
        }
      }
    });
  }
}
</script>
