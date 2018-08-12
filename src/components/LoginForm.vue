<template>
    <div>
        <h2 class="title">Sign In</h2>

        <div class="field">
            <div class="control">
                <label class="label">Email: </label>
                <input class="input" type="text" :value="email" @input="this.updateEmail" />
            </div>
        </div>
        <div class="field">
            <div class="control">
                <label class="label">Password: </label>
                <input class="input" type="password" :value="password" @input="this.updatePassword" />
            </div>
        </div>

        <div class="field">
            <div class="control">
                <button class="button" @click="emailLogin">Sign In</button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Provide, Vue } from "nuxt-property-decorator";

@Component()
export default class LoginForm extends Vue {
  @Provide()
  email = "";

  @Provide()
  password = "";

  updateEmail(e) {
    this.email = e.target.value;
  }

  updatePassword(e) {
    this.password = e.target.value;
  }

  emailLogin() {
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
        console.log(e.message);
      });
  }
}
</script>
