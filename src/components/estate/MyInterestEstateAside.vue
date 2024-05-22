<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});
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
              class="list-group-item list-group-item-action"
              id="list-home-list"
              data-bs-toggle="list"
              aria-controls="list-home"
            >
              <div class="d-flex w-100 mb-2 justify-content-between">
                <h4 class="m-1">동양엔파트 474동</h4>
                <button class="btn btn-link">
                  <img class="like" src="@/assets/heart.svg" />
                </button>
              </div>
              <div class="price_line ms-2"><span class="price fs-4">5억</span></div>
              <div class="mt-2 ms-2">
                <span class="floor">4층</span>, <span class="net_area">53m²</span>
              </div>
              <div class="mt-2">
                <small class="contract_date fw-bold">등록일: 2023년 05월 21일</small>
              </div>
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-home-list"
              data-bs-toggle="list"
              aria-controls="list-home"
            >
              <div class="d-flex w-100 mb-2 justify-content-between">
                <h4 class="m-1">행복아파트 101동</h4>
                <button class="btn btn-link">
                  <img class="like" src="@/assets/heart.svg" />
                </button>
              </div>
              <div class="price_line ms-2"><span class="price fs-4">3억 5,000</span></div>
              <div class="mt-2 ms-2">
                <span class="floor">7층</span>, <span class="net_area">45m²</span>
              </div>
              <div class="mt-2">
                <small class="contract_date fw-bold">등록일: 2023년 05월 18일</small>
              </div>
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-home-list"
              data-bs-toggle="list"
              aria-controls="list-home"
            >
              <div class="d-flex w-100 mb-2 justify-content-between">
                <h4 class="m-1">광명빌라 B동</h4>
                <button class="btn btn-link">
                  <img class="like" src="@/assets/heart.svg" />
                </button>
              </div>
              <div class="price_line ms-2"><span class="price fs-4">2억 8,000</span></div>
              <div class="mt-2 ms-2">
                <span class="floor">2층</span>, <span class="net_area">38m²</span>
              </div>
              <div class="mt-2">
                <small class="contract_date fw-bold">등록일: 2023년 05월 15일</small>
              </div>
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-home-list"
              data-bs-toggle="list"
              aria-controls="list-home"
            >
              <div class="d-flex w-100 mb-2 justify-content-between">
                <h4 class="m-1">광명빌라 B동</h4>
                <button class="btn btn-link">
                  <img class="like" src="@/assets/heart.svg" />
                </button>
              </div>
              <div class="price_line ms-2"><span class="price fs-4">2억 8,000</span></div>
              <div class="mt-2 ms-2">
                <span class="floor">2층</span>, <span class="net_area">38m²</span>
              </div>
              <div class="mt-2">
                <small class="contract_date fw-bold">등록일: 2023년 05월 15일</small>
              </div>
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-home-list"
              data-bs-toggle="list"
              aria-controls="list-home"
            >
              <div class="d-flex w-100 mb-2 justify-content-between">
                <h4 class="m-1">광명빌라 B동</h4>
                <button class="btn btn-link">
                  <img class="like" src="@/assets/heart.svg" />
                </button>
              </div>
              <div class="price_line ms-2"><span class="price fs-4">2억 8,000</span></div>
              <div class="mt-2 ms-2">
                <span class="floor">2층</span>, <span class="net_area">38m²</span>
              </div>
              <div class="mt-2">
                <small class="contract_date fw-bold">등록일: 2023년 05월 15일</small>
              </div>
            </a>
            <a
              class="list-group-item list-group-item-action"
              id="list-home-list"
              data-bs-toggle="list"
              aria-controls="list-home"
            >
              <div class="d-flex w-100 mb-2 justify-content-between">
                <h4 class="m-1">광명빌라 B동</h4>
                <button class="btn btn-link">
                  <img class="like" src="@/assets/heart.svg" />
                </button>
              </div>
              <div class="price_line ms-2"><span class="price fs-4">2억 8,000</span></div>
              <div class="mt-2 ms-2">
                <span class="floor">2층</span>, <span class="net_area">38m²</span>
              </div>
              <div class="mt-2">
                <small class="contract_date fw-bold">등록일: 2023년 05월 15일</small>
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
