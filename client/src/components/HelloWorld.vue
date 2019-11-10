<template>
  <div>
    <div v-if="giftee && !shouldHideSecretPal">
      <h1>Your Secret Pal is {{giftee.displayName}}</h1>
      <p>{{giftee.displayName}}'s Wishlist:</p>
      <vue-markdown :source="secretPalList"></vue-markdown>
    </div>
    <div v-if="user && shouldHideSecretPal">
      <h2>Your Wishlist</h2>
      <vue-markdown :source="wishlist" v-if="wishlist"></vue-markdown>
    </div>
    <div v-if="!user" class="signin">
      <h2>
        <router-link to="sign-in">Sign In</router-link>
      </h2>
      <img :src="photoUrl" :v-if="photoUrl" />
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
import { FirestoreRepo } from "../firestore-repo";
const list = namespace("list");
const login = namespace("login");
const photos = namespace("photos");
import { db } from "../store/firestore";
import { SecretSantaUser } from "../store/login/types";
const year = new Date().getFullYear();

@Component
export default class HelloWorld extends Vue {
  @list.Getter("wishlist")
  private wishlist!: string;
  @login.State("user")
  private user!: User;
  @photos.State("photoUrl")
  private photoUrl!: string;
  @photos.Action("init")
  private initPhoto!: any;
  @list.State("editMode")
  private shouldHideSecretPal: any;
  private giftee: SecretSantaUser | null = null;
  private secretPalList: string = "";
  private async created() {
    console.log(`Hiding secret pal: ${this.shouldHideSecretPal}`);
    if (this.user) {
      const repo = new FirestoreRepo(db);
      const [santa, secretPalList] = await repo.santaFor(
        this.user.uid,
        `${year}`
      );
      this.giftee = santa;
      this.secretPalList = secretPalList;
    } else {
      this.initPhoto();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
