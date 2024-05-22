import { createRouter, createWebHistory } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { storeToRefs } from "pinia";

const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  const { userInfo, isValidToken } = storeToRefs(memberStore);
  const { getUserInfo } = memberStore;

  let token = sessionStorage.getItem("accessToken");

  if (userInfo.value != null && token) {
    await getUserInfo(token);
  }
  if (!isValidToken.value || userInfo.value === null) {
    next({ name: "user-login" });
  } else {
    next();
  }
};

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // main //
    {
      path: "/",
      name: "main",
      component: () => import("@/views/MainView.vue"),
    },

    // 유저 //
    {
      path: "/user",
      name: "user",
      component: () => import("@/views/UserView.vue"),
      children: [
        {
          path: "login",
          name: "user-login",
          component: () => import("@/components/users/UserLogin.vue"),
        },
        {
          path: "join",
          name: "user-join",
          component: () => import("@/components/users/UserRegister.vue"),
        },
        {
          path: "mypage",
          name: "user-mypage",
          beforeEnter: onlyAuthUser,
          component: () => import("@/components/users/UserMyPage.vue"),
        },
      ],
    },
  ],
});

export default router;
