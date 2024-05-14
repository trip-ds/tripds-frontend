// menuStore.js
import { ref } from "vue";
import { defineStore } from "pinia";
import { useMemberStore } from "@/stores/member.js";

export const useUserMenuStore = defineStore("menuStore", () => {
  const menuList = ref([
    { name: "회원가입", routeName: "user-join", show: true },
    { name: "로그인", routeName: "user-login", show: true },
    // 임시
    { name: "내 정보", routeName: "user-mypage", show: false },
    { name: "로그아웃", routeName: "user-logout", show: false },
  ]);

  const changeMenuState = () => {
    menuList.value = menuList.value.map((item) => ({ ...item, show: !item.show }));
  };
  return {
    menuList,
    changeMenuState,
  };
});
