<script setup>
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
body {
  background-color: #FCFCFC;
}
</style>
