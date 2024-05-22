<script setup>
  import { onMounted } from "vue";
  import {getLocation} from "@/util/map-commons";
  import {getComplexDealSummaryList} from "@/api/map";
  import {displaySiGunGuInfo} from "@/maps/map";
  
  const kakaoMapApiKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;
  const residenceType = 'oneroom'
  
  let map, geocoder, ps
  let facilityOverlay, facilityContentNode, facilityMarkers = [], curCategory = ''
  let complexOverlay, complexContentNode, complexMarkers = []
  let cctvMarkers = [], streetlightMarkers = [];
    
  onMounted(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false&libraries=services`;
    document.head.appendChild(script);    

    script.onload = () => {
      kakao.maps.load(async () => {
        const node = document.getElementById('map');
        const {lat, lng} = await getLocation();
        const options = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 2
        };

        map = new kakao.maps.Map(node, options);
        geocoder = new kakao.maps.services.Geocoder()

        // 지도영역 변경
        kakao.maps.event.addListener(map, 'bounds_changed', function () {      
          displaySiGunGuInfo(map, geocoder)
          getComplexDealSummaryList(map, residenceType)
        })    
    });
    };    
  })
</script>

<template>
  <section id="map">
    <ul id="category">
      <li id="BK9" data-order="0">
        <span class="category_bg bank"></span>은행        
      </li>
      <li id="MT1" data-order="1">
        <span class="category_bg mart"></span>마트        
      </li>
      <li id="PM9" data-order="2">
        <span class="category_bg pharmacy"></span>약국        
      </li>
      <li id="OL7" data-order="3">
        <span class="category_bg oil"></span>주유소        
      </li>
      <li id="CE7" data-order="4">
        <span class="category_bg cafe"></span>카페        
      </li>
      <li id="CS2" data-order="5">
        <span class="category_bg store"></span>편의점        
      </li>
      <li id="CCTV" data-order="6">
        <span class="category_bg cctv"></span>CCTV        
      </li>
      <li id="streetlight" data-order="7">
        <span class="category_bg streetlight"></span>가로등        
      </li>
    </ul>
  </section>  
</template>

<style scoped>
  #map {  
    height: 100%;
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
