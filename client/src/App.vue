<template>
<md-app>
  <md-app-toolbar md-elevation="1">
      <h3 class="md-title" style="flex: 1">Secret Santa</h3>
      <md-button @click="route('')" class="">Home</md-button>
      <md-button @click="route('list')" class="md-raised md-primary" v-if="user">List</md-button>
      <md-button @click="route('sign-in')" v-if="!user" class="md-raised md-primary">Sign In</md-button>
      <md-menu v-if="user">
        <md-avatar class="md-avatar-icon" v-if="user.photoURL">
          <img class="settings-avi" :src="user.photoURL" md-menu-trigger>
        </md-avatar>
        <md-button md-menu-trigger v-if="!user.photoURL">Menu</md-button>
        <md-menu-content>
          <md-menu-item @click="route('register')">Settings</md-menu-item>
          <md-menu-item @click="logout()">Logout</md-menu-item>
        </md-menu-content>
      </md-menu>
  </md-app-toolbar>
  <md-app-content>
    <router-view />
  </md-app-content>
</md-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import router from '@/router';
import { User } from 'firebase';
import { mapState, mapMutations } from 'vuex';
import { namespace } from 'vuex-class';
import { firebase } from '@/store/firestore';

const login = namespace('login');
const list = namespace('list');

@Component
export default class App extends Vue {
  @login.State('user')
  private user!: User;
  @login.Mutation('logout')
  private loginLogoutAction: any;
  @list.Mutation('logout')
  private logoutAction: any;
  private route(url: string) {
    router.push(`/${url}`);
  }
  private async logout() {
    await firebase.auth().signOut();
    this.loginLogoutAction();
    this.logoutAction();
    router.push('/');
  }
}
</script>


<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.md-avatar-icon {
  margin-left: 6px;
}
.settings-avi {
  cursor: pointer;
}
</style>
