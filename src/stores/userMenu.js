// menuStore.js
import { ref } from "vue";
import { defineStore } from "pinia";
import { useMemberStore } from "@/stores/member.js";

export const useUserMenuStore = defineStore("menuStore", () => {
  const memberStore = useMemberStore();

  const menuList = ref([
    { name: "회원가입", routeName: "user-join", show: !memberStore.isLogin },
    { name: "로그인", routeName: "user-login", show: !memberStore.isLogin },
    { name: "내 정보", routeName: "user-mypage", show: memberStore.isLogin },
    { name: "로그아웃", routeName: "user-logout", show: memberStore.isLogin },
  ]);

  const changeMenuState = () => {
    menuList.value = menuList.value.map((item) => ({ ...item, show: !item.show }));
  };
  return {
    menuList,
    changeMenuState,
  };
});
