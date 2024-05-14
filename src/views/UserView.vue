<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="container text-center mt-3">
    <router-view></router-view>
  </div>
</template>

<style>
mark.orange {
  background: linear-gradient(to top, rgb(243, 164, 18) 20%, transparent 30%);
}
</style>
