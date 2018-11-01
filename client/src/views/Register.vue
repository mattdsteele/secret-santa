<template>
<div>
    <h1>Your Info</h1>
    <form @submit="updateInfo()" @submit.prevent>
        <md-field>
        <label>Name</label>
        <md-input v-model="updatedName"></md-input>
        </md-field>
        <md-field>
        <label>E-mail</label>
        <md-input v-model="updatedEmail"></md-input>
        </md-field>
        <md-button type="submit" class="md-raised">Update</md-button>
    </form>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const login = namespace('login');
@Component
export default class Register extends Vue {
  @login.Getter('email')
  private email!: string;
  @login.Getter('name')
  private name!: string;
  @login.Action('updateUser')
  private updateUser!: any;
  private updatedName!: string;
  private updatedEmail!: string;
  private created() {
    this.updatedName = this.name;
    this.updatedEmail = this.email;
  }
  private async updateInfo() {
    await this.updateUser({
      email: this.updatedEmail,
      displayName: this.updatedName
    });
    this.$router.push('/list');
  }
}
</script>

<style scoped>
</style>
