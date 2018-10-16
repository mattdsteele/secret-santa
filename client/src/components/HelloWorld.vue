<template>
  <div>
    <div v-if="giftee">
      <h2>Your Secret Santa</h2>
      <p>{{giftee.displayName}}</p>
    </div>
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
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { User } from 'firebase';
import { FirestoreRepo } from '../firestore-repo';
const list = namespace('list');
const login = namespace('login');
const photos = namespace('photos');
import { db } from '../store/firestore';
import { SecretSantaUser } from '../store/login/types';

@Component
export default class HelloWorld extends Vue {
  @list.Getter('wishlist')
  private wishlist!: string;
  @login.State('user')
  private user!: User;
  @photos.State('photoUrl')
  private photoUrl!: string;
  @photos.Action('init')
  private initPhoto: any;
  private giftee!: SecretSantaUser = null;
  private async created() {
    this.initPhoto();
    const repo = new FirestoreRepo(db);
    if (this.user) {
      const santa = await repo.santaFor(this.user.uid, '2018');
      this.giftee = santa;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
