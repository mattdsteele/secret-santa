<template>
<div>
<h1>My List</h1>
<md-field>
    <label>Textarea with Autogrow</label>
    <md-textarea v-model="wishlist" md-autogrow></md-textarea>
</md-field>
{{ wishlist }}
</div>
    
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator';

@Component
export default class List extends Vue {
    public wishlist = '';
}
</script>
