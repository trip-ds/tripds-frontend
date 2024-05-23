import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { httpStatusCode } from "@/util/http-status";
import * as estateAPI from "@/api/estate.js";

export const useEstateStore = defineStore("estateStore", () => {
  // 관심부동산 //
  const estateInterestList = ref([]);

  const insertEstateInterest = async (estateInterest) => {
    await estateAPI.insertEstateInterest(
      estateInterest,
      (response) => {
        console.log("등록성공 여부 : " + response.data);
      },
      (error) => {
        console.log("관심 부동산 등록 실패!!!");
        console.log(error);
      }
    );
  };

  const getEsateInterestList = async () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const email = userInfo.email;

    await estateAPI.getEstateInterestInfoByEmail(
      email,
      (response) => {
        estateInterestList.value = response.data;
      },
      (error) => {
        console.log("관심 부동산 목록 출력 실패!!!");
        console.log(error);
      }
    );

    return estateInterestList.value;
  };

  return { estateInterestList, getEsateInterestList, insertEstateInterest };
});
