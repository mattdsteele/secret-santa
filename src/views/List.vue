<template>
<div>
<h1>My List</h1>
<md-field>
    <label>Your Wish List:</label>
    <md-textarea :value="currentYearList.list" @input="updateList($event)" rows="10" class="txt"></md-textarea>
</md-field>
<md-button @click="update()">Update</md-button>
<hr>
<vue-markdown :source="currentYearList.list"></vue-markdown>
<p>{{ currentYearList }}</p>
</div>
    
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';

const defaultWishlist = `
# My Wish List

## Favorite Books

* How to Win At Everything
* Best Buds For Life

## Favorite Stores

* Foo
* Bar
`;

import { db } from "@/store/firestore";
import { User } from "firebase";
import { namespace } from "vuex-class";
const login = namespace("login");
const list = namespace('list');

@Component
export default class List extends Vue {
    @login.State("user") private user!: User;
    @list.Action('init') private init: any;
    @list.Action('updateUserList') private updateUserList: any;
    @list.State('currentYearList') private currentYearList: any;
    private updatedList = '';
    private async created() {
        await this.init(this.user);
    }
    private updateList(list: string) {
        this.updatedList = list;
    }
    private update() {
        this.updateUserList(this.updatedList);
    }
}
</script>

<style>
textarea.md-textarea.md-textarea {
    font-family: 'Consolas', Courier, monospace;
}
.txt.txt.txt {
    height: 300px;
    max-height: none;
}
</style>
