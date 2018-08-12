<template>
    <nav class="navbar is-white" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">Site Name</div>
            <div class="navbar-burger" data-target="navMenu" @click="this.toggleMenu" :class="{'is-active': isMenuActive}">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="navbar-menu" id="navMenu" :class="{'is-active': isMenuActive}">
            <div class="navbar-end">
                <nuxt-link to="/" class="navbar-item">Top</nuxt-link>
                <nuxt-link to="/about" class="navbar-item">About</nuxt-link>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { State } from "vuex-class";

@Component
export default class Index extends Vue {
  @State(state => state.navbar.isMenuActive)
  private isMenuActive: boolean;

  toggleMenu() {
    this.$store.dispatch("navbar/toggleMenu");
  }
}
</script>
