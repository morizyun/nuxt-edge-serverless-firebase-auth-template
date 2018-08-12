<template>
    <div>
        <h2 class="title">Sign In</h2>

        <div v-if="errorMessage" class="notification is-danger">errorMessage: {{ errorMessage }}</div>
        <form @submit.prevent="emailLogin">
            <div class="field">
                <label class="label">Email: </label>
                <input type="text" class="input" v-model="email">
            </div>
            <div class="field">
                <label class="label">Password: </label>
                <input type="password" class="input" v-model="password">
            </div>
            <input type="submit" class="button" value="button">
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";

@Component()
export default class LoginForm extends Vue {
  email = "";
  password = "";
  errorMessage = "";

  emailLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = "Invalid email or password!";
      return;
    }

    this.$store
      .dispatch("user/signInWithEmail", {
        email: this.email,
        password: this.password
      })
      .then(() => {
        if (process.client) {
          window.location.reload();
        }
      })
      .catch(e => {
        this.errorMessage = e.message;
      });
  }
}
</script>
