<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="container">
    <div class="form-container">
      <div class="form-container">
        <p class="title">회원가입</p>
        <p class="sub-title">트립동산에 서비스를 이용하실 수 있습니다.</p>
        <form class="form">
          <input type="text" class="input" placeholder="닉네임" />
          <input type="number" class="input" placeholder="나이" />
          <input type="email" class="input" placeholder="이메일" />
          <input type="password" class="input" placeholder="비밀번호" />
          <input type="password" class="input" placeholder="비밀번호 확인" />
          <input type="text" class="input" placeholder="주소" />
          <button class="form-btn">회원가입</button>
        </form>
        <p class="sign-up-label">
          이미 계정이 있으십니까 ?
          <span class="sign-up-link">
            <RouterLink :to="{ name: 'user-login' }" class="link">로그인</RouterLink>
          </span>
          <span> / </span>
          <span class="sign-up-link">
            <RouterLink :to="{ name: 'main' }" class="link">홈으로</RouterLink>
          </span>
        </p>
        <div class="buttons-container">
          <div class="google-login-button">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1.1"
              x="0px"
              y="0px"
              class="google-icon"
              viewBox="0 0 48 48"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
      c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
      c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
      C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              ></path>
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
      c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              ></path>
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
      c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              ></path>
            </svg>
            <span style="font-family: 'Jalnan2TTF'">Sign up with Google</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  font-family: "Jalnan2TTF";
}
.form-container {
  width: 350px;
  height: 550px;
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 20px 30px;
}

.title {
  text-align: center;
  font-family: "Jalnan2TTF";
  margin: 10px 0 30px 0;
  font-size: 28px;
  font-weight: 800;
}

.sub-title {
  margin: 0;
  margin-bottom: 5px;
  font-size: 9px;
  font-family: "Jalnan2TTF";
}

.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-bottom: 15px;
}

.input {
  border-radius: 20px;
  border: 1px solid #c0c0c0;
  outline: 0 !important;
  box-sizing: border-box;
  padding: 12px 15px;
}

.form-btn {
  padding: 10px 15px;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva,
    Verdana, sans-serif;
  border-radius: 20px;
  border: 0 !important;
  outline: 0 !important;
  background: #87ceeb;
  color: white;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: "Jalnan2TTF";
}

.form-btn:active {
  box-shadow: none;
}

.sign-up-label {
  margin: 0;
  font-size: 10px;
  color: #747474;
  font-family: "Jalnan2TTF";
}

.sign-up-link {
  margin-left: 1px;
  font-size: 11px;
  text-decoration: underline;
  text-decoration-color: #a0a0a0;
  color: #a0a0a0;
  cursor: pointer;
  font-weight: 800;
  font-family: "Jalnan2TTF";
}

.sign-up-link .link {
  color: #a0a0a0;
  text-decoration: underline;
  text-decoration-color: #a0a0a0;
}

.buttons-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 15px;
}

.apple-login-button,
.google-login-button {
  border-radius: 20px;
  box-sizing: border-box;
  padding: 10px 15px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva,
    Verdana, sans-serif;
  font-size: 11px;
  gap: 5px;
}

.apple-login-button {
  background-color: #000;
  color: #fff;
  border: 2px solid #000;
}

.google-login-button {
  border: 2px solid #747474;
}

.apple-icon,
.google-icon {
  font-size: 18px;
  margin-bottom: 1px;
}
</style>
