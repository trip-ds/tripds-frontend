import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { httpStatusCode } from "@/util/http-status";
import * as estateAPI from "@/api/estate.js";

export const useEstateStore = defineStore("estateStore", () => {
  const estateList = ref([]);

  const getEsateInterestList = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const email = userInfo.email;

    await estateAPI.getEstateInterestInfoByEmail(
      email,
      (response) => {
        estateList.value = response.data;
      },
      (error) => {
        console.log("관심 부동산 목록 출력 실패!!!");
        console.log(error);
      }
    );
  };

  return { estateList, getEsateInterestList };
});
