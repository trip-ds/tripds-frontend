<script setup>

</script>

<template>
  <header>
    <nav class="nav-scroller navbar navbar-light p-3 mb-3 border-bottom">
      <div class="container">
      <div class="d-flex align-items-center justify-content-center justify-content-lg-start">
          <form class="d-flex col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input class="form-control me-2" type="search" placeholder="단지명" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
          </form>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="nav-item dropdown px-2">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" data-bs-auto-close="false"
              aria-expanded="false">거래방식</a>
              <ul class="dropdown-menu">
              <div class="dropdown-item form-check">
                  <input class="form-check-input ms-auto" type="checkbox" value="" id="sale">
                  <label class="form-check-label mx-2" for="sale">매매</label>
              </div>
              <div class="dropdown-item form-check">
                  <input class="form-check-input ms-auto" type="checkbox" value="" id="rent_two_year">
                  <label class="form-check-label mx-2" for="rent_two_year">전세</label>
              </div>
              <div class="dropdown-item form-check">
                  <input class="form-check-input ms-auto" type="checkbox" value="" id="rent_monthly">
                  <label class="form-check-label mx-2" for="rent_monthly">월세</label>
              </div>
              </ul>
          </li>
          </ul>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="nav-item dropdown px-2">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" data-bs-auto-close="false"
              aria-expanded="false">월세</a>
              <div class="dropdown-menu row g-2">
              <div class="col-md">
                  <div class="form-floating">
                  <input type="number" class="form-control" id="minAmount" placeholder="min amount" value="40">
                  <label for="minAmount">최소 금액(만원)</label>
                  </div>
              </div>
              <div class="col-md">
                  <div class="form-floating">
                  <input type="email" class="form-control" id="maxAmount" placeholder="max amount" value="100">
                  <label for="maxAmount">최대 금액(만원)</label>
                  </div>
              </div>
              </div>
          </li>
          </ul>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="nav-item dropdown px-2">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" data-bs-auto-close="false"
              aria-expanded="false">전세가(보증금/매매가)</a>
              <div class="dropdown-menu row g-2">
              <div class="col-md">
                  <div class="form-floating">
                  <input type="number" class="form-control" id="minAmount" placeholder="min amount" value="300">
                  <label for="minAmount">최소 금액(만원)</label>
                  </div>
              </div>
              <div class="col-md">
                  <div class="form-floating">
                  <input type="email" class="form-control" id="maxAmount" placeholder="max amount" value="10000">
                  <label for="maxAmount">최대 금액(만원)</label>
                  </div>
              </div>
              </div>
          </li>
          </ul>

          <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li class="nav-item dropdown px-2">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" data-bs-auto-close="false"
              aria-expanded="false">면적</a>
              <ul class="dropdown-menu">
              <div class="dropdown-item form-check">
                  <input class="form-check-input ms-auto" type="checkbox" value="" id="sale">
                  <label class="form-check-label mx-2" for="sale">10평이하</label>
              </div>
              <div class="dropdown-item form-check">
                  <input class="form-check-input ms-auto" type="checkbox" value="" id="rent_two_year">
                  <label class="form-check-label mx-2" for="rent_two_year">10평대</label>
              </div>
              </ul>
          </li>
          </ul>
      </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  :root {
    --nav-height: 70px; /* 네비게이션 바의 높이를 CSS 변수로 정의 */    
  }

  nav {
    /* position: fixed; */
    top: 0;
    height: var(--nav-height);
    background-color: #e3f2fd;
  }

  /* header {
    --bs-breadcrumb-divider: '>';
  } */

</style>
