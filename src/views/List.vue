<template>
<div>
<h1>My List</h1>
<md-field>
    <label>Your Wish List:</label>
    <md-textarea v-model="wishlist" md-autogrow></md-textarea>
</md-field>
<hr>
<vue-markdown :source="wishlist"></vue-markdown>
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

@Component
export default class List extends Vue {
    public wishlist = defaultWishlist;
}
</script>

<style>
textarea.md-textarea.md-textarea {
    font-family: 'Consolas', Courier, monospace;
}
</style>
