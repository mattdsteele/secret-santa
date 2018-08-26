<template>
  <div class="about">
    <h1>This is an about page!</h1>
    <div v-if="user">
      <p>{{user.displayName}}</p>
      <img :src="user.photoURL">
    </div>
    <h2>Names:</h2>
    <p v-for="(entry, idx) in testData" :key="idx">data: {{entry.datum}} ({{idx}})</p>
    <form @submit="addLocation(name)">
      <md-field>
        <label>Location Name</label>
        <md-input v-model="name"></md-input>
    </md-field>
    <md-button type="submit">Add New Location</md-button>
  </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { db } from "@/store/firestore";
import { User } from "firebase";
import { namespace } from "vuex-class";
const login = namespace("login");

@Component
export default class About extends Vue {
  private name = "";
  @login.State("user") private user!: User;
  @login.State("testData") private testData!: string[];
  @login.Action("getTestData") private getTestData: any;

  private addLocation(name: string) {
    db.collection("test-data").add({ datum: name });
    this.name = "";
  }
  private async created() {
    await this.getTestData();
  }
}
</script>
