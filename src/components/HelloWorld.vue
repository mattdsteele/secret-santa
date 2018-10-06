<template>
  <div>
    <div v-if="user">
      <h2>Your Wishlist</h2>
      <vue-markdown :source="wishlist" v-if="wishlist"></vue-markdown>
    </div>
    <div v-if="!user" class="signin">
      <h2><router-link to="sign-in">Sign In</router-link></h2>
      <img :src="photoUrl" :v-if="photoUrl">
    </div>
  </div>
</template>

<style scoped>
  .signin {
    margin: 0 auto;
    text-align: center;
    max-width: 480px;
  }
  img {
    width: 100%;
    border-radius: 10px;
  }
</style>


<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { User } from "firebase";
const list = namespace('list');
const login = namespace('login');
const photos = namespace('photos');

@Component
export default class HelloWorld extends Vue {
    @list.Getter('wishlist') private wishlist!: string;
    @login.State("user") private user!: User;
    @photos.State('photoUrl') private photoUrl!: string;
    @photos.Action('init') private initPhoto: any;
    private created() {
      this.initPhoto();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
