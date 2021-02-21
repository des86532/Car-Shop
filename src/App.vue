<template>
  <div id="app">
    <loading :active.sync="isLoading"></loading>
      <Navbar/>
      <router-view/>
      <Footer/>
  </div>
</template>

<style lang="scss">
@import "./assets/all";
</style>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  }
};
</script>
