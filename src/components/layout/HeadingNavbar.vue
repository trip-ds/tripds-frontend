<script setup>
import { useUserMenuStore } from "@/stores/userMenu.js";
import { useMemberStore } from "@/stores/member.js";
import { storeToRefs } from "pinia";

const menuStore = useUserMenuStore();
const memberStore = useMemberStore();

const { menuList } = storeToRefs(menuStore);
const { changeMenuState } = menuStore;

const { userLogout } = memberStore;

const logout = () => {
  userLogout();
  changeMenuState();
};
</script>

<template>
  <header>
    <div class="top-bar">
      <div class="left-section">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <h1 class="title">트립동산</h1>
      </div>
      <template class="right-section" v-for="menu in menuList" :key="menu.routeName">
        <template v-if="menu.show">
          {{ menu.name }}

          <!-- <template v-if="menu.routeName === 'user-logout'">
            <li class="nav-item">
              <router-link to="#" @click.prevent="logout" class="nav-link">{{
                menu.name
              }}</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link :to="{ name: menu.routeName }" class="nav-link">{{
                menu.name
              }}</router-link>
            </li>
          </template> -->
        </template>
      </template>
    </div>
    <hr />
    <div class="bottom-bar">
      <ul class="left-menu">
        <li><a href="#">원룸</a></li>
        <li><a href="#">오피스텔</a></li>
        <li><a href="#">MY관심</a></li>
      </ul>
      <ul class="right-menu">
        <li><a href="#">커뮤니티</a></li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
header {
  font-family: "BMHANNAPro";
  padding: 20px;
  background-color: #fcfcfc;
  margin: 5px;
  padding: 0;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}

.left-section {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.title {
  margin: 0;
  font-size: 20px;
  color: #87ceeb;
}

.right-section {
  display: flex;
}

.login,
.signup {
  margin-left: 10px;
  text-decoration: none;
  color: #333;
}

hr {
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
}

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
}

.left-menu,
.right-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 50px; /* 메뉴 항목 사이 간격 추가 */
}

.left-menu li,
.right-menu li {
  margin-right: 20px;
}

.bottom-bar a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}
</style>
