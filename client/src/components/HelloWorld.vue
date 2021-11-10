<template>
  <div>
    <div v-if="giftee && !shouldHideSecretPal">
      <h1>Your Secret Pal is {{giftee.displayName}}</h1>
      <md-card>
        <md-card-header>
          <div class="md-title">{{giftee.displayName}}'s Wishlist</div>
        </md-card-header>
        <md-card-content>
          <vue-markdown :source="secretPalList"></vue-markdown>
        </md-card-content>
      </md-card>
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
import {defaultWishlist} from '../store/list/wishlist';
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
  @list.Action("updateUserList")
  private updateUserList: any;
  @list.Action("init")
  private initList: any;
  @list.Action("setListEditMode")
  private setListEditMode!: any;
  private giftee: SecretSantaUser | null = null;
  private secretPalList: string = "";
  private async created() {
    console.log(`Hiding secret pal: ${this.shouldHideSecretPal}`);
    if (this.user) {
      const repo = new FirestoreRepo(db);
      try {
        const userList = await repo.listFor(this.user.uid, year);
        console.log(`found list is ${userList}`);
        // Check secret pal, but don't fail if not

        try {
          const [santa, secretPalList] = await repo.santaFor(
            this.user.uid,
            `${year}`
          );
          this.giftee = santa;
          this.secretPalList = secretPalList;
        } catch (e) {
          console.log(`no secret pal found`)
          // Dispatch and go to Edit Mode
          await this.setListEditMode();
          this.$router.push("/list");
        }
      } catch (e) {
        // If no user list, don't fail 
        console.log(`no list found`);
        await this.initList(this.user);
        await this.updateUserList(defaultWishlist);
        await this.setListEditMode();
        this.$router.push("/list");
      }
    } else {
      this.initPhoto();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
