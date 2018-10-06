<template>
<div>
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
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';

import { db } from "@/store/firestore";
import { User } from "firebase";
import { State, Getter, namespace } from "vuex-class";
const login = namespace("login");
const list = namespace('list');

@Component
export default class List extends Vue {
    @login.State("user") private user!: User;
    @list.Action('init') private init: any;
    @list.Action('updateUserList') private updateUserList: any;
    @list.State('currentYearList') private currentYearList: any;
    @list.Getter('wishlist') private wishlist!: string;
    private updatedList:any = null;
    private async created() {
        await this.init(this.user);
        console.log('got it', this.user, this.currentYearList, this.wishlist);
        this.updatedList = this.wishlist;
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
