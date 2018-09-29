<template>
<md-app>
  <md-app-toolbar md-elevation="1">
      <h3 class="md-title" style="flex: 1">Secret Santa</h3>
      <md-button @click="route('')" class="">Home</md-button>
      <md-button @click="route('about')" class="">About</md-button>
      <md-button @click="route('list')" class="md-raised md-primary" v-if="user">List</md-button>
      <md-button @click="route('sign-in')" v-if="!user" class="md-raised md-primary">Sign In</md-button>
      <md-avatar class="md-avatar-icon" v-if="user"><img :src="user.photoURL"></md-avatar>
  </md-app-toolbar>
  <md-app-content>
    <router-view />
  </md-app-content>
</md-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import router from "@/router";
import { User } from "firebase";
import { mapState, mapMutations } from "vuex";
import { namespace } from "vuex-class";
const login = namespace("login");

@Component
export default class App extends Vue {
  @login.State("user") private user!: User;
  private route(url: string) {
    router.push(`/${url}`);
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
