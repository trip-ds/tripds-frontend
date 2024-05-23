import { localAxios } from "@/util/http-commons";

const local = localAxios();

// 관심 부동산 //
async function insertEstateInterest(param, success, fail) {
  console.log(param);
  await local.post(`/api/estate/interest/insert`, param).then(success).catch(fail);
}

async function getEstateInterestInfoByEmail(email, success, fail) {
  console.log(email);
  await local.get(`/api/estate/interest/info/${email}`).then(success).catch(fail);
}

export { insertEstateInterest, getEstateInterestInfoByEmail };
