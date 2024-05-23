<script setup>
import { ref } from "vue";
import { useEstateStore } from "@/stores/estate.js";
import HeadingNavbar from "@/components/layout/HeadingNavbar.vue";
import MyInterestEstateAside from "@/components/estate/MyInterestEstateAside.vue";

const estateStore = useEstateStore();
const { getEsateInterestList, insertEstateInterest } = estateStore;

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

// 등록 예시 코드
const insertInterest = async () => {
  const param = {
    email: "ssafy@ssafy.com",
    registerNumber: "11140-2020-00046",
  };

  await insertEstateInterest(param);
};
</script>

<template>
  <HeadingNavbar @toggle-aside="toggleAside" />
  <div>main</div>

  <!-- 등록 예시 버튼 -->
  <button @click="insertInterest">등록</button>

  <MyInterestEstateAside
    :isOpen="isAsideOpen"
    :estate-interest-list="estateInterestList"
    @close="isAsideOpen = false"
  />
</template>

<style scoped></style>
