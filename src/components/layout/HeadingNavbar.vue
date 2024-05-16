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
      <ul class="right-section">
        <template v-for="menu in menuList" :key="menu.routeName">
          <li v-if="menu.show" class="nav-item">
            <router-link
              v-if="menu.routeName === 'user-logout'"
              to="/"
              @click.prevent="logout"
              class="nav-link"
              >{{ menu.name }}</router-link
            >
            <router-link v-else :to="{ name: menu.routeName }" class="nav-link">{{
              menu.name
            }}</router-link>
          </li>
        </template>
      </ul>
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
  font-family: "Jalnan2TTF";
  background-color: #fcfcfc;
  padding: 20px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
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
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  margin-left: 20px;
}

.nav-link {
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
}

.left-menu,
.right-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 30px;
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
