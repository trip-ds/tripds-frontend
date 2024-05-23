import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function getEstateInterestInfoByEmail(email, success, fail) {
  console.log(email);
  await local.get(`/api/estate/interest/info/${email}`).then(success).catch(fail);
}

export { getEstateInterestInfoByEmail };
