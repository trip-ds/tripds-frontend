<script setup>
import { ref } from "vue";
import { useEstateStore } from "@/stores/estate.js";
import HeadingNavbar from "@/components/layout/HeadingNavbar.vue";
import MyInterestEstateAside from "@/components/estate/MyInterestEstateAside.vue";

const estateStore = useEstateStore();
const { getEsateInterestList } = estateStore;

const isAsideOpen = ref(false);
const estateInterestList = ref([]);

const toggleAside = async () => {
  console.log(isAsideOpen.value);
  isAsideOpen.value = !isAsideOpen.value;
  if (isAsideOpen.value) {
    estateInterestList.value = await getEsateInterestList();
    console.log(estateInterestList);
  }
};
</script>

<template>
  <HeadingNavbar @toggle-aside="toggleAside" />
  <div>main</div>

  <MyInterestEstateAside
    :isOpen="isAsideOpen"
    :estate-interest-list="estateInterestList"
    @close="isAsideOpen = false"
  />
</template>

<style scoped></style>
