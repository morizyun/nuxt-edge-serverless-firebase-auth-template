<template>
    <div>
        <section class="hero is-primary is-bold">
            <div class="hero-body">
                <h1 class="title is-size-2">
                    Login Page
                </h1>
            </div>
        </section>
        <loginForm />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import LoginForm from "~/components/LoginForm";

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {}
</script>
