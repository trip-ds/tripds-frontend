<script setup>
import { ref } from "vue";
import HeadingNavbar from "@/components/layout/HeadingNavbar.vue";
import MyInterestEstateAside from "@/components/estate/MyInterestEstateAside.vue";

const isAsideOpen = ref(false);

const toggleAside = () => {
  console.log(isAsideOpen.value);
  isAsideOpen.value = !isAsideOpen.value;
};
</script>

<template>
  <HeadingNavbar @toggle-aside="toggleAside" />
  <div>main</div>

  <MyInterestEstateAside :isOpen="isAsideOpen" @close="isAsideOpen = false" />
</template>

<style scoped></style>
