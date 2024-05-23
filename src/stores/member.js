import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

import {
  userDelete,
  userUpdate as userUpdateAPI,
  userRegister,
  userConfirm,
  findByEmail,
  tokenRegeneration,
  logout,
} from "@/api/user";
import { httpStatusCode } from "@/util/http-status";

export const useMemberStore = defineStore("memberStore", () => {
  const router = useRouter();

  const isLogin = ref(sessionStorage.getItem("isLogin") || false);
  const isLoginError = ref(false);
  const userInfo = ref(JSON.parse(sessionStorage.getItem("userInfo")) || null);
  const isValidToken = ref(false);
  const isRegistered = ref(false);
  const isRegisterError = ref(false);

  const userSignup = async (registerUser) => {
    return new Promise((resolve, reject) => {
      userRegister(
        registerUser,
        (response) => {
          if (response.status === httpStatusCode.CREATE) {
            console.log("회원가입 성공!!!!");
            isRegistered.value = true;
            isRegisterError.value = false;
            resolve();
          }
        },
        (error) => {
          console.log("회원가입 실패!!!!");
          isRegistered.value = false;
          isRegisterError.value = true;
          console.error(error.response.data.message);
          reject(error);
        }
      );
    });
  };

  const userUpdate = async (updatedUser) => {
    return new Promise((resolve, reject) => {
      userUpdateAPI(
        // userUpdate 대신 userUpdateAPI를 호출합니다.
        updatedUser,
        (response) => {
          if (response.status === httpStatusCode.OK) {
            console.log("사용자 정보 업데이트 성공!!!!");
            resolve();
          }
        },
        (error) => {
          console.log("사용자 정보 업데이트 실패!!!!");
          console.error(error.response.data.message);
          reject(error);
        }
      );
    });
  };

  const userLogin = async (loginUser) => {
    await userConfirm(
      loginUser,
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          console.log("로그인 성공!!!!");
          let { data } = response;
          let accessToken = data["access-token"];
          let refreshToken = data["refresh-token"];
          isLogin.value = true;
          isLoginError.value = false;
          isValidToken.value = true;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("refreshToken", refreshToken);
          sessionStorage.setItem("isLogin", true);

          getUserInfo(accessToken);
        }
      },
      (error) => {
        console.log("로그인 실패!!!!");
        isLogin.value = false;
        isLoginError.value = true;
        isValidToken.value = false;
        console.error(error);

        throw error;
      }
    );
  };

  const getUserInfo = async (token) => {
    let decodeToken = jwtDecode(token);
    await findByEmail(
      decodeToken.email,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          console.log(response);
          userInfo.value = response.data;
          isValidToken.value = true;

          sessionStorage.setItem("userInfo", JSON.stringify(userInfo.value));
        } else {
          console.log("유저 정보 없음!!!!");
        }

        console.log(userInfo.value);
      },
      async (error) => {
        console.error(
          "g[토큰 만료되어 사용 불가능.] : ",
          error.response.status,
          error.response.statusText
        );
        isValidToken.value = false;

        await tokenRegenerate();
      }
    );
  };

  const deleteAccount = async () => {
    const email = userInfo.value.email;
    await userDelete(
      email,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          console.log("계정 삭제 성공");
          isLogin.value = false;
          userInfo.value = null;
          isValidToken.value = false;
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          sessionStorage.removeItem("isLogin");
          sessionStorage.removeItem("userInfo");
          router.push({ name: "user-login" });
        } else {
          console.error("계정 삭제 실패");
        }
      },
      (error) => {
        console.error("계정 삭제 실패:", error);
      }
    );
  };

  const tokenRegenerate = async () => {
    await tokenRegeneration(
      JSON.stringify(userInfo.value),
      (response) => {
        if (response.status === httpStatusCode.CREATE) {
          let accessToken = response.data["access-token"];
          sessionStorage.setItem("accessToken", accessToken);
          isValidToken.value = true;
        }
      },
      async (error) => {
        // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
        if (error.response.status === httpStatusCode.UNAUTHORIZED) {
          // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
          await logout(
            userInfo.value.email,
            (response) => {
              if (response.status === httpStatusCode.OK) {
                console.log("리프레시 토큰 제거 성공");
              } else {
                console.log("리프레시 토큰 제거 실패");
              }
              alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
              isLogin.value = false;
              userInfo.value = null;
              isValidToken.value = false;
              router.push({ name: "user-login" });
            },
            (error) => {
              console.error(error);
              isLogin.value = false;
              userInfo.value = null;
            }
          );
        }
      }
    );
  };

  const userLogout = async () => {
    console.log("로그아웃 아이디 : " + userInfo.value.email);
    await logout(
      userInfo.value.email,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          isLogin.value = false;
          userInfo.value = null;
          isValidToken.value = false;

          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          sessionStorage.removeItem("isLogin");
          sessionStorage.removeItem("userInfo");
        } else {
          console.error("유저 정보 없음!!!!");
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return {
    isRegistered,
    isRegisterError,
    isLogin,
    isLoginError,
    userInfo,
    isValidToken,
    userSignup,
    userLogin,
    getUserInfo,
    tokenRegenerate,
    userLogout,
    userUpdate,
    deleteAccount,
  };
});
