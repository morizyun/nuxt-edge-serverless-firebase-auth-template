<template>
    <div>
        <section class="hero is-primary is-bold">
            <div class="hero-body">
                <h1 class="title is-size-2">
                    Top Page
                </h1>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";
import LoginForm from "~/components/LoginForm";

@Component({
  components: {
    LoginForm
  }
})
export default class Index extends Vue {
  @State(state => state.user.user)
  private user: object;

  @State(state => state.user.loadingUser)
  private loadingUser: boolean;
}
</script>
