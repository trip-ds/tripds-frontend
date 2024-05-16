<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/member";
import { useUserMenuStore } from "@/stores/userMenu.js";

const router = useRouter();
const memberStore = useMemberStore();
const { isLogin, isLoginError } = storeToRefs(memberStore);
const { userLogin, getUserInfo } = memberStore;
const { changeMenuState } = useUserMenuStore();

const loginUser = ref({
  userId: "",
  userPwd: "",
});

const login = async () => {
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem("accessToken");
  console.log(token);
  console.log("isLogin: " + isLogin.value);
  if (isLogin.value) {
    getUserInfo(token);
    changeMenuState();
    router.replace("/");
  }
};
</script>

<template>
  <div class="content">
    <div class="container vh-100 d-flex flex-column justify-content-between">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-4">
          <div class="text-center">
            <div class="d-flex align-items-center justify-content-center">
              <img
                src="@/assets/logo.png"
                alt="Logo"
                class="img-fluid me-3"
                style="max-width: 60px"
              />
              <router-link :to="{ name: 'main' }" class="text-decoration-none">
                <h1 class="mb-0 text-primary-custom display-4">트립동산</h1>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="form-box p-5">
            <form>
              <div class="mb-4">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="loginUser.userId"
                  placeholder="example@gmail.com"
                />
              </div>
              <div class="mb-4">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="loginUser.userPwd"
                  @keyup.enter="login"
                  placeholder="••••••••••"
                />
              </div>
              <div class="mb-4 text-end">
                <a href="#" class="text-decoration-none text-secondary">비밀번호 찾기</a>
              </div>
              <div class="d-grid mb-4">
                <button type="button" class="btn btn-custom btn-lg shadow-sm" @click="login">
                  로그인
                </button>
              </div>
              <div class="mb-4 text-center">OR</div>
              <div class="d-grid mb-4">
                <button
                  type="button"
                  class="btn btn-outline-custom btn-lg d-flex align-items-center justify-content-center shadow-sm"
                >
                  <img
                    src="@/assets/google.png"
                    alt="Google Logo"
                    class="me-2"
                    style="max-width: 20px"
                  />
                  <span>Login with Google</span>
                </button>
              </div>
            </form>
          </div>
          <div class="text-center mt-3">
            <a href="#" class="text-secondary text-decoration-none">비밀번호를 잊기</a> |
            <a href="#" class="text-secondary text-decoration-none">아이디 찾기</a> |
            <RouterLink :to="{ name: 'user-join' }" class="text-secondary text-decoration-none"
              >회원가입</RouterLink
            >
          </div>
        </div>
      </div>
      <div class="row justify-content-center mb-3">
        <div class="col-lg-4">
          <div class="text-center text-secondary">
            트립동산 by noah, jongkwan, All Rights Reservered
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  font-family: "Jalnan2TTF";
}
.form-box {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-custom {
  background-color: #87ceeb;
  color: #ffffff;
  border: none;
}

.btn-outline-custom {
  color: #333333;
  background-color: transparent;
  border: none;
}

.btn-custom:hover,
.btn-outline-custom:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.text-primary-custom {
  color: #87ceeb;
}

.text-secondary {
  color: #a0a0a0;
}
</style>
