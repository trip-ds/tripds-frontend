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
  font-family: "BMHANNAPro";
  src: url("../public/fonts/BMHANNAPro.ttf");
}

body {
  font-family: "BMHANNAPro";
  -moz-osx-font-smoothing: grayscale;
}
</style>
