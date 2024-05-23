<script setup>
import HeadingNavbar from "@/components/layout/HeadingNavbar.vue";
import { RouterView } from "vue-router";
</script>

<template>
  <div class="d-flex flex-column min-vh-100">
    <main class="flex-grow-1">
      <RouterView></RouterView>
    </main>
  </div>
</template>

<style>
  @font-face {
    font-family: "Jalnan2TTF";
    src: url("../public/fonts/Jalnan2TTF.ttf");
  }

  body {
    font-family: "Jalnan2TTF";
    -moz-osx-font-smoothing: grayscale;
  }

  .facilityinfo_wrap {
    position: absolute;
    bottom: 28px;
    left: -150px;
    width: 300px;

    .facilityinfo {
      position: relative;
      width: 100%;
      border-radius: 6px;
      border: 1px solid #ccc;
      border-bottom: 2px solid #ddd;
      padding-bottom: 10px;
      background: #fff;

      &:nth-of-type(n) {
        border: 0;
        box-shadow: 0px 1px 2px #888;
      }

      .after {
        content: "";
        position: relative;
        margin-left: -12px;
        left: 50%;
        width: 22px;
        height: 12px;
        background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
      }

      a,
      a:hover,
      a:active {
        color: #fff;
        text-decoration: none;
      }

      a,
      span {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      span {
        margin: 5px 5px 0 5px;
        cursor: default;
        font-size: 13px;
      }

      .title {
        font-weight: bold;
        font-size: 14px;
        border-radius: 6px 6px 0 0;
        margin: -1px -1px 0 -1px;
        padding: 10px;
        color: #fff;
        background: #d95050;
        background: #d95050
          url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png") no-repeat
          right 14px center;
      }

      .tel {
        color: #0f7833;
      }

      .jibun {
        color: #999;
        font-size: 11px;
        margin-top: 0;
      }
    }
  }

  .complexinfo-wrap {
    position: relative;
    bottom: 85px;
    border-radius: 6px;
    border: 1px solid #ccc;
    border-bottom: 2px solid #ddd;
    float: left;

    /* &:nth-of-type(n) {
      border: 0;
      box-shadow: 0px 1px 2px #888;
    } */

    /* a {
      display: block;
      text-decoration: none;
      color: #000;
      text-align: center;
      border-radius: 6px;
      font-size: 14px;
      font-weight: bold;
      overflow: hidden;
      background: #d95050;
      background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
    } */

    .info {
      display: block;
      text-align: center;
      background: #fff;
      padding: 10px 15px;
      font-size: 14px;
      font-weight: bold;
    }

    &:after {
      content: "";
      position: absolute;
      margin-left: -12px;
      left: 50%;
      bottom: -12px;
      width: 22px;
      height: 12px;
      background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
    }
  }

  .complex_price,
  .complex_area {
    line-height: 8px;

    dt,
    dd {
      display: inline-block;
      margin-right: 4px;
    }
  }

  .offcanvas {
    --bs-offcanvas-width: 22%;
  }

  .table-auto {
    table-layout: auto;
  }

  .info-item {
    width: 105px;
    text-align: center;
    border-bottom: 1px solid #dee2e6;
  }

  .info-value {
    text-align: center;
    border-bottom: 1px solid #dee2e6;
  }

  .list-group-item.active {
    background-color: rgba(135, 206, 235, 0.2); /* 15% 불투명도 */
    border-color: rgba(135, 206, 235, 0.2);
    color: inherit; /* 부모 요소의 텍스트 색상을 상속 */
  }

  a.list-group-item {
    border: 1px solid rgb(222, 226, 230) !important;
  }

  .price_line .complex_deal_price {
    color: rgb(76, 148, 232);
    font-weight: 600;
  }

  .complex_deal_contract_date {
    color: rgba(255, 99, 71, 0.8); /* 연한 빨강 텍스트 색상 */
    padding: 5px; /* 내부 여백 추가 */
    font-size: 13px;
    margin-left: 8px;
    border: 1px solid rgba(255, 99, 71, 0.8); /* 연한 빨강 테두리 */
    border-radius: 5px; /* 모서리 둥글게 */
  }

  .complex_deal_contract_date .date {
    color: inherit; /* 부모 요소의 텍스트 색상을 상속 */
  }

  .deal_list_order a {
    margin-right: 15px;
    margin-bottom: 15px;
    padding: 5px 10px;
    border: 1px solid transparent; /* 기본 테두리 투명 설정 */
    border-radius: 5px;
    color: inherit; /* 부모 요소의 텍스트 색상을 상속 */
    text-decoration: none;
  }

  .deal_list_order a:hover,
  .deal_list_order a.active {
    color: rgb(10, 190, 22) !important;
    font-weight: 700;
  }

  #category {
    padding: 0;
    margin: 10px;
    position: absolute;
    right: 10px;
    border-radius: 5px;
    border: 1px solid #909090;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
    background: #fff;
    overflow: hidden;
    z-index: 2;
    float: right;

    li {
      float: left;
      list-style: none;
      width: 50px;
      border-right: 1px solid #acacac;
      padding: 6px 0;
      text-align: center;
      cursor: pointer;

      &.on {
        background: #eee;
      }

      &:hover {
        background: #ffe6e6;
        border-left: 1px solid #acacac;
        margin-left: -1px;
      }

      &:last-child {
        margin-right: 0;
        border-right: 0;
      }

      span {
        display: block;
        margin: 0 auto 3px;
        width: 27px;
        height: 28px;

        &.bank {
          background: url("@/assets/img/금융서비스.png") no-repeat;
          background-size: contain;
        }

        &.mart {
          background: url("@/assets/img/슈퍼마켓.png") no-repeat;
          background-size: contain;
        }

        &.pharmacy {
          background: url("@/assets/img/약국.png") no-repeat;
          background-size: contain;
        }

        &.oil {
          background: url("@/assets/img/자동차.png") no-repeat;
          background-size: contain;
        }

        &.cafe {
          background: url("@/assets/img/카페.png") no-repeat;
          background-size: contain;
        }

        &.store {
          background: url("@/assets/img/편의점.png") no-repeat;
          background-size: contain;
        }

        &.cctv {
          background: url("@/assets/img/cctv.png") no-repeat;
          background-size: contain;
        }

        &.streetlight {
          background: url("@/assets/img/streetlight.png") no-repeat;
          background-size: contain;
        }

        &.on.category_bg {
          background-position-x: -46px;
        }
      }
    }
  }  
</style>
