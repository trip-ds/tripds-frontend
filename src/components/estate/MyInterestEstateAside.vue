<script setup>
import { watch } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  estateInterestList: {
    type: Array,
    default: () => [],
  },
});

watch(
  () => props.estateInterestList,
  (newVal) => {
    console.log(newVal);
  }
);

const formatRegisterDate = (registerDate) => {
  if (registerDate && registerDate.length === 3) {
    const [year, month, day] = registerDate;
    return `${year}년 ${month}월 ${day}일`;
  }
  return "";
};
</script>

<!-- Aside.vue -->
<template>
  <aside
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasScrolling"
    aria-labelledby="offcanvasScrollingLabel"
    :class="{ show: isOpen }"
  >
    <div class="offcanvas-header">
      <h3 class="aside-title">관심 부동산</h3>
      <button
        type="button"
        class="btn-close text-reset me-3"
        @click="$emit('close')"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="card">
        <div class="card-header text-success fs-4 fw-bold">관심 부동산 목록</div>
        <div class="card-body col-12">
          <div class="deal_list_order d-flex ms-1">
            <a href="#" role="button" class="link-dark active">최신순</a>
            <a href="#" role="button" class="link-dark">가격순</a>
          </div>
          <div class="list-group gap-3">
            <a
              v-for="estate in estateInterestList"
              :key="estate.registerNumber"
              class="list-group-item list-group-item-action"
              id="list-home-list"
              data-bs-toggle="list"
              aria-controls="list-home"
            >
              <div class="d-flex w-100 mb-2 justify-content-between">
                <h4 class="m-1">{{ estate.complexName ? estate.complexName : estate.name }}</h4>
                <button class="btn btn-link">
                  <img class="like" src="@/assets/heart.svg" />
                </button>
              </div>
              <div class="price_line ms-2">
                <span class="price fs-4">{{ estate.roadName }}</span>
              </div>
              <div class="mt-2 ms-2">
                <div class="floor">{{ estate.complexName }}</div>
                <div class="net_area">대표 : {{ estate.representativeName }}</div>
              </div>
              <div class="mt-2">
                <small class="contract_date fw-bold"
                  >등록일: {{ formatRegisterDate(estate.registerDate) }}</small
                >
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.offcanvas {
  width: 400px;
}

.offcanvas-title,
.card-header,
.list-group-item h4 {
  white-space: normal;
  word-wrap: break-word;
}

.offcanvas-title,
.card-header {
  font-size: 1.2rem;
}

.list-group-item h4 {
  font-size: 1rem;
}

.price_line {
  white-space: normal;
  word-wrap: break-word;
}
</style>
