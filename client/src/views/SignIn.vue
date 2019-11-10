<template>
  <div id="auth"></div>
</template>
<script lang="ts">
import Vue from "vue";
import { auth } from "firebaseui";
import { firebase } from "../store/firestore";
import Component from "vue-class-component";
import { Action, namespace } from "vuex-class";

const login = namespace("login");
@Component
export default class HelloWorld extends Vue {
  @login.State("editMode")
  private editMode: any;
  @login.Action("doLogin")
  private loginAction: any;
  private mounted() {
    let ui = auth.AuthUI.getInstance();
    if (!ui) {
      ui = new auth.AuthUI(firebase.auth());
    }
    this.loginFn();
    const uiConfig = {
      signInFlow: "popup",
      signInSuccessUrl: "#/post-auth",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    };
    ui.start("#auth", uiConfig);
  }
  private loginFn() {
    const firebaseAuth = firebase.auth();
    firebaseAuth.onAuthStateChanged(async user => {
      if (user) {
        const { newUser } = await this.loginAction(user);
        if (newUser) {
          this.$router.push("register");
        } else {
          this.$router.push(this.editMode !== false ? "/list" : "/");
        }
      }
    });
  }
}
</script>
