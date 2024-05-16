<script setup>
import HeadingNavbar from "@/components/layout/HeadingNavbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <main class="flex-grow-1">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style>
@font-face {
  font-family: "Jalnan2TTF";
  src: url("../public/fonts/Jalnan2TTF.ttf");
}

body {
  font-family: "Jalnan2TTF";
  -moz-osx-font-smoothing: grayscale;
}
</style>
