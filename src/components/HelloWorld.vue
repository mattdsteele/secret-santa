<template>
  <div>
    <h1>SECRET SANTA</h1>
    <div v-if="user">
      <h2>Your Wishlist</h2>
      <vue-markdown :source="wishlist" v-if="wishlist"></vue-markdown>
    </div>
    <div v-if="!user">
      <h2><router-link to="sign-in">Sign In</router-link></h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "firebase";
const list = namespace('list');
const login = namespace('login');

@Component
export default class HelloWorld extends Vue {
    @list.Getter('wishlist') private wishlist!: string;
    @login.State("user") private user!: User;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
