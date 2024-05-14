<script setup>
import HeadingNavbar from "@/components/layout/HeadingNavbar.vue";
</script>

<template>
  <HeadingNavbar />
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  flex-shrink: 0;
}

router-view {
  flex-grow: 1;
}

@font-face {
  font-family: "BMHANNAPro";
  src: url("../public/fonts/BMHANNAPro.ttf");
}
</style>
