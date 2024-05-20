import { localAxios } from "@/util/http-commons";
import BaseComponent from "bootstrap/js/dist/base-component";

const local = localAxios();

async function userRegister(param, success, fail) {
  console.log(param);
  await local.post(`/api/user/signup`, param).then(success).catch(fail);
}

async function userUpdate(param, success, fail) {
  console.log(param);
  await local.put(`/api/user/update`, param).then(success).catch(fail);
}

async function userConfirm(param, success, fail) {
  await local.post(`/api/user/login`, param).then(success).catch(fail);
}

async function findByEmail(email, success, fail) {
  local.defaults.headers["Authorization"] = sessionStorage.getItem("accessToken");
  await local.get(`/api/user/info/${email}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  local.defaults.headers["refreshToken"] = sessionStorage.getItem("refreshToken"); //axios header에 refresh-token 셋팅
  await local.post(`/api/user/refresh`, user).then(success).catch(fail);
}

async function logout(email, success, fail) {
  await local.get(`/api/user/logout/${email}`).then(success).catch(fail);
}

export { userRegister, userUpdate, userConfirm, findByEmail, tokenRegeneration, logout };
