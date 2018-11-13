<template>
<div>
<md-progress-bar md-mode="indeterminate" v-if="!updatedList"></md-progress-bar>
<h1>My List</h1>
<md-field>
    <label>Your Wish List:</label>
    <md-textarea :value="wishlist" @input="updateList($event)" rows="10" class="txt"></md-textarea>
</md-field>
<md-button class="md-raised md-primary" @click="update()">Update</md-button>
<hr>
<vue-markdown :source="updatedList" v-if="updatedList"></vue-markdown>
</div>
    
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

import { db } from '@/store/firestore';
import { User } from 'firebase';
import { State, Getter, namespace } from 'vuex-class';
import { setTimeout } from 'timers';
const login = namespace('login');
const list = namespace('list');

@Component
export default class List extends Vue {
  @login.State('user')
  private user!: User;
  @list.Action('init')
  private init: any;
  @list.Action('updateUserList')
  private updateUserList: any;
  @list.State('currentYearList')
  private currentYearList: any;
  @list.Getter('wishlist')
  private wishlist!: string;
  private updatedList: any = null;
  private async checkForUser() {
    console.log('checking for user', this.user);
    if (this.user) {
      await this.init(this.user);
      this.updatedList = this.wishlist;
      return true;
    }
    return false;
  }
  private async mounted() {
    let hasUser = await this.checkForUser();
    if (!hasUser) {
      setTimeout(async () => {
        hasUser = await this.checkForUser();
      }, 400);
    }
  }
  private updateList(newList: string) {
    this.updatedList = newList;
  }
  private async update() {
    await this.updateUserList(this.updatedList);
    this.$router.push('/');
  }
}
</script>

<style>
textarea.md-textarea.md-textarea {
  font-family: 'Consolas', Courier, monospace;
}
.txt.txt.txt {
  height: 500px;
  max-height: none;
}
</style>
