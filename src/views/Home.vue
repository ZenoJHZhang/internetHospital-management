<template>
  <div class="home">
    <title-bar></title-bar>
    <nav-menu></nav-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import navMenu from "@/components/navMenu.vue";
import titleBar from "@/components/titleBar.vue"
export default {
  name: "home",
  components: {
    navMenu,
    titleBar
  }
};
</script>
