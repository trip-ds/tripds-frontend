<script setup>
import HeadingNavbar from "@/components/layout/HeadingNavbar.vue";
import { ref, onMounted } from "vue";
import { useMemberStore } from "@/stores/member.js";
import { useUserMenuStore } from "@/stores/userMenu.js";
import router from "@/router";

const { changeMenuState } = useUserMenuStore();
const memberStore = useMemberStore();

const isEditing = ref(false);
const originalInfo = ref({});

function toggleEdit() {
  if (isEditing.value) {
    // 수정 모드에서 취소 버튼을 클릭한 경우, 원래 정보로 되돌립니다.
    nickname.value = originalInfo.value.nickname;
    age.value = originalInfo.value.age;
    address.value = originalInfo.value.address;
  } else {
    // 수정 모드로 진입할 때, 원래 정보를 저장합니다.
    originalInfo.value = {
      nickname: nickname.value,
      age: age.value,
      address: address.value,
    };
  }
  isEditing.value = !isEditing.value;
}

const nickname = ref("");
const email = ref("");
const age = ref("");
const address = ref("");

const fetchUserInfo = async () => {
  if (memberStore.isLogin) {
    await memberStore.getUserInfo(sessionStorage.getItem("accessToken"));
    const userInfo = memberStore.userInfo;
    nickname.value = userInfo.nickname;
    email.value = userInfo.email;
    age.value = userInfo.age;
    address.value = userInfo.address;
  }
};

onMounted(fetchUserInfo);

const updateUser = async () => {
  const updatedUser = {
    nickname: nickname.value,
    age: age.value,
    address: address.value,
    email: email.value,
  };

  try {
    await memberStore.userUpdate(updatedUser);
    await fetchUserInfo();
    isEditing.value = !isEditing.value;
  } catch (error) {
    console.error("사용자 정보 업데이트 실패:", error);
  }
};

const deleteAccount = async () => {
  if (window.confirm("정말 계정을 삭제하시겠습니까?")) {
    await memberStore.deleteAccount();
    changeMenuState();
    router.replace("/");
  }
};
</script>

<template>
  <HeadingNavbar />
  <div class="container">
    <h1 class="text-center my-4 mypage">My Page</h1>
    <div class="row align-items-center" style="margin-top: 100px">
      <div class="col-md-5">
        <div class="row justify-content-center mb-4">
          <div class="col-auto">
            <img
              src="@/assets/logo.png"
              alt="Nike Logo"
              class="rounded-circle"
              style="width: 100px; height: 100px"
            />
          </div>
        </div>
        <div class="row justify-content-center text-center mb-4">
          <div class="col-4">
            <div class="border p-3">
              <h4>21</h4>
              <p>Shots</p>
            </div>
          </div>
          <div class="col-4">
            <div class="border p-3">
              <h4>238</h4>
              <p>Followers</p>
            </div>
          </div>
          <div class="col-4">
            <div class="border p-3">
              <h4>101</h4>
              <p>Following</p>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-auto">
            <button class="delete-account noselect" @click="deleteAccount">
              <span class="text">계정삭제</span>
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="row justify-content-center">
          <div class="col-md-10">
            <h4 class="mb-4">내 정보</h4>
            <hr class="mb-4" />
            <form>
              <div class="form-group mb-4">
                <label for="designerInput">닉네임</label>
                <input
                  v-model="nickname"
                  type="text"
                  class="form-control"
                  style="width: 100%"
                  :readonly="!isEditing"
                />
              </div>
              <div class="form-group mb-4">
                <label for="workInput">이메일</label>
                <input
                  v-model="email"
                  type="text"
                  class="form-control"
                  style="width: 100%"
                  readonly
                />
              </div>
              <div class="form-group mb-4">
                <label for="figmaInput">나이</label>
                <input
                  v-model="age"
                  type="number"
                  class="form-control"
                  style="width: 100%"
                  :readonly="!isEditing"
                />
              </div>
              <div class="form-group mb-4">
                <label for="figmaInput">주소</label>
                <input
                  v-model="address"
                  type="text"
                  class="form-control"
                  style="width: 100%"
                  :readonly="!isEditing"
                />
              </div>
              <div class="d-flex justify-content-end mt-4">
                <button
                  v-if="!isEditing"
                  type="button"
                  class="btn btn-primary save"
                  @click="toggleEdit"
                >
                  수정하기
                </button>
                <template v-else>
                  <button type="button" class="btn btn-secondary mr-3" @click="toggleEdit">
                    CANCEL
                  </button>
                  <button type="button" class="btn btn-primary save" @click="updateUser">
                    SAVE
                  </button>
                </template>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.save {
  margin-left: 15px;
}
.mypage {
  color: #87ceeb;
}
.container {
  font-family: "Jalnan2TTF";
}
.col-md-5 {
  padding-right: 50px;
}
.col-md-7 {
  padding-left: 50px;
}
.delete-account {
  width: 150px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  background: red;
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  background: #e62222;
}
.delete-account,
.delete-account span {
  transition: 200ms;
}
.delete-account .text {
  transform: translateX(35px);
  color: white;
  font-weight: bold;
}
.delete-account .icon {
  position: absolute;
  border-left: 1px solid #c41b1b;
  transform: translateX(110px);
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.delete-account svg {
  width: 15px;
  fill: #eee;
}
.delete-account:hover {
  background: #ff3636;
}
.delete-account:hover .text {
  color: transparent;
}
.delete-account:hover .icon {
  width: 150px;
  border-left: none;
  transform: translateX(0);
}
.delete-account:focus {
  outline: none;
}
.delete-account:active .icon svg {
  transform: scale(0.8);
}
</style>
