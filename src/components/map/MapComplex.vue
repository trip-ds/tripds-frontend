<script setup>  
  import { onMounted } from "vue";
  // import {addEventHandle} from "@/util/js-commons";
  // import {getLocation} from "@/util/map-commons";
  // import {addFacilityMarker, changeCategoryClass} from "@/maps/map";  
  // import {displaySiGunGuInfo, getComplexDealSummaryList} from "@/api/map";  
  
  const kakaoMapApiKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;
  let map, geocoder, ps
  let facilityOverlay, facilityContentNode, facilityMarkers = [], curCategory = ''
  let complexOverlay, complexContentNode, complexMarkers = []
  let cctvMarkers = [], streetlightMarkers = [];
  let residenceType = 'oneroom'

  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              resolve({ lat, lng });
            },
            (error) => {
              reject(error);
            }
          );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  const displaySiGunGuInfoCB = (result, status) => {
    if (status !== kakao.maps.services.Status.OK) {
      console.error("request fail! si_gun_gu") 
      return;
    }

    const {region_1depth_name, region_2depth_name, region_3depth_name} = result[1]
    const regionNames = [region_1depth_name, region_2depth_name, region_3depth_name]
    const breadcrumbItems = $('ol.breadcrumb')[0].children;

    for (let i = 0; i < breadcrumbItems.length; i++) breadcrumbItems[i].textContent = regionNames[i]
  }

  const displaySiGunGuInfo = () => {
    const center = map.getCenter();
    const centerLng = center.getLng();
    const centerLat = center.getLat();
    
    // request: 좌표 to 행정동 주소
    geocoder.coord2RegionCode(centerLng, centerLat, displaySiGunGuInfoCB); 
  }

  async function init() {
    await initMap()
    displaySiGunGuInfo()
    initFacility()
    initComplexList(residenceType)
  }

  async function initMap() {
    const node = document.getElementById('map');
    const {lat, lng} = await getLocation();
    const options = {
      // center: new kakao.maps.LatLng(37.566826, 126.9786567),
      center: new kakao.maps.LatLng(37.5566314744617, 127.009975257685),
      // center: new kakao.maps.LatLng(lat, lng),
      level: 2
    };

    map = new kakao.maps.Map(node, options);
    geocoder = new kakao.maps.services.Geocoder()

    // 지도영역 변경
    kakao.maps.event.addListener(map, 'bounds_changed', function () {      
      displaySiGunGuInfo()
      initComplexList(residenceType)
    })    
  }


  const addEventHandle = (target, type, callback) => {
    if (target.addEventListener) target.addEventListener(type, callback)
    else target.attachEvent('on' + type, callback)
  }

  const addFacilityMarker = (position, category) => {
    console.log(category);
    const imageSrc = `img/${category}.png`;
    const imageSize = new kakao.maps.Size(27, 28);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const marker = new kakao.maps.Marker({
      position: position,
      image: markerImage
    });

    marker.setMap(map);
    facilityMarkers.push(marker);

    return marker;
  };

  const removeFacilityMarker = () => {
    for (let i = 0; i < facilityMarkers.length; i++) {
      facilityMarkers[i].setMap(null)
    }
    facilityMarkers = []
  }

  const displayFacilityInfo = (place) => {
    // let content = `<div class="facilityinfo"><a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}" >${place.place_name}</a>`
    let content = `<div class="facilityinfo">`

    if (place.road_address_name) {
      content += ` <span title=${place.road_address_name}>${place.road_address_name}</span> <span class="jibun" title=${place.address_name}>(지번 : ${place.address_name})</span>`
    } else {
      content += ` <span title=${place.address_name}>${place.address_name}</span>`
    }

    content += ` <span class="tel">${place.phone}</span></div><div class="after"></div>`
    facilityContentNode.innerHTML = content
    facilityOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x))
    facilityOverlay.setMap(map)
  }

  const searchFacilities = () => {
    
    if (!curCategory) {
      return;
    }
    else if (curCategory === 'CCTV') {
      getCctvData(map);
    }
    else if (curCategory === 'streetlight'){
      getStreetlightData(map);
    }
    else {
      facilityOverlay.setMap(null)

      removeFacilityMarker();

      ps.categorySearch(curCategory, searchFacilitiesCB, { useMapBounds: true })
    }
  }

  const searchFacilitiesCB = (data, status) => {
    if (status === kakao.maps.services.Status.OK) displayFacilities(data);
    // else if (status === kakao.maps.services.Status.ZERO_RESULT) console.log("fail")
    // else if (status === kakao.maps.services.Status.ERROR) console.log("error")
  }

  const displayFacilities = (places) => {
    for (let i = 0; i < places.length; i++) {
      const category = places[i].category_name.split('>')[1].trim();
      const marker = addFacilityMarker(new kakao.maps.LatLng(places[i].y, places[i].x), category);
      (function (marker, place) {
        kakao.maps.event.addListener(marker, 'click', function () {
          displayFacilityInfo(place);
        });
      })(marker, places[i]);
    }
  };

  const addCategoryClickEvent = () => {
    const category = document.getElementById('category')
    const children = category.children

    for (let i = 0; i < children.length; i++) children[i].onclick = onClickCategory
  }

  function onClickCategory() {
    const id = this.id, className = this.className;

    facilityOverlay.setMap(null);

    if (className === 'on') {
      curCategory = '';
      changeCategoryClass();
      removeFacilityMarker();
      removeCctvMarkers();
      removeStreetlightMarkers();
    } else {
      curCategory = id;
      changeCategoryClass(this);
      searchFacilities();
    }
  }

  function changeCategoryClass(el) {
    const category = document.getElementById('category')
    let children = category.children

    for (let i = 0; i < children.length; i++) children[i].className = '';

    if (el) el.className = 'on';
  }

  function initFacility() {
    kakao.maps.event.addListener(map, 'idle', searchFacilities)

    ps = new kakao.maps.services.Places(map);  // 장소검색

    facilityContentNode = document.createElement('div') // 커스텀 오버레이 노드
    facilityContentNode.className = 'facilityinfo_wrap'
    addEventHandle(facilityContentNode, 'mousedown', kakao.maps.event.preventMap)

    facilityOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }) // 커스텀 오버레이 (장소정보)
    facilityOverlay.setContent(facilityContentNode)

    addCategoryClickEvent()
  }


  const addComplexMarker = (position) => {
    const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png' // TODO: '단지' 이미지로 변경
    const imageSize = new kakao.maps.Size(64, 69)
    const imageOptions = {
      // spriteSize: new kakao.maps.Size(27,69),
      // spriteOrigin: new kakao.maps.Point(46,(order*36)),        
      offset: new kakao.maps.Point(27, 69)
    }
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOptions)
    const marker = new kakao.maps.Marker({
      // position: position, 
      position: new kakao.maps.LatLng(37.566826, 126.9786567),
      image: markerImage
    })

    marker.setMap(map)
    // complexMarkers.push(marker)

    // return marker
  }

  const displayComplexSummaryInfo = (info) => {
    let content = `
      <div class="complexinfo-wrap badge-container">        
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${info.cnt}</span>
        <div class="info">
          <div class="road_name" style="display: none"></div>
          <div class="title">${info.name}</div>            
          <div class="price_wrap">
            <span class="type">${info.contractType}</span>
            <span class="price">${info.avgAmount} ${info.amountUnit}</span>
          </div>
          <dl class="size_wrap">
            <dd class="size">${info.avgNetArea}㎡</dd>              
          </dl>            
          <div>
              <button type="button" 
                      class="btn btn-secondary btm-sm btn-block position-relative complex_info" 
                      data-bs-toggle="offcanvas" 
                      data-bs-target="#offcanvasScrolling" 
                      data-road_name="${info.roadName}"                      
                      aria-controls="offcanvasScrolling">detail</button>
          </div>   
        </div>          
      </div>
    `
    
    complexOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }) // 커스텀 오버레이 (장소정보)
    complexOverlay.setMap(map)
    complexOverlay.setPosition(new kakao.maps.LatLng(info.yCoordinate, info.xCoordinate))
    complexOverlay.setContent(content)
  }


  const getBounds = () => {
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    const topLat = neLatLng.getLat();
    const bottomLat = swLatLng.getLat();
    const leftLng = swLatLng.getLng();
    const rightLng = neLatLng.getLng();

    return { topLat, bottomLat, leftLng, rightLng };
  }

  const getComplexDealSummaryList = (residenceType) => {
    const {topLat, bottomLat, leftLng, rightLng} = getBounds()
    $.ajax({
      url: 'http://localhost:8080/api/house/deal/list-summary',
      type: 'GET',
      data: {
        residenceType, topLat, bottomLat, leftLng, rightLng
      },
      success: function(response) {
        for (const dealSummary of response) {
          // console.log(dealSummary)

          if (dealSummary.contractType === '전세') {
            dealSummary.avgAmount = dealSummary.avgDeposit/10000
            dealSummary.amountUnit = '억'
          } else if (dealSummary.contractType === '월세') {
            dealSummary.avgAmount = `${dealSummary.avgMonthlyRent}/${dealSummary.avgDeposit}`
            dealSummary.amountUnit = ''
          } else if (dealSummary.contractType === '매매') {
            dealSummary.avgAmount = dealSummary.avgPrice/10000
            dealSummary.amountUnit = '억'
          }

          addComplexMarker(dealSummary)
          displayComplexSummaryInfo(dealSummary)
        }        
      },
      error: function (error) {
        console.log(error);
      }
    })
  }



  function initComplexList(residenceType) {        
    getComplexDealSummaryList(residenceType)    
  }  

  // cctv
  function getCctvData(map) {
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    $.ajax({
      url: 'http://localhost:8080/api/cctv/map',
      type: 'GET',
      data: {
        swLat: swLatLng.getLat(),
        swLng: swLatLng.getLng(),
        neLat: neLatLng.getLat(),
        neLng: neLatLng.getLng()
      },
      success: function (response) {
        displayCctvMarkers(response);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  function displayCctvMarkers(cctvList) {
    // 기존의 CCTV 마커 제거
    removeCctvMarkers();

    // 새로운 CCTV 마커 추가
    for (let i = 0; i < cctvList.length; i++) {
      const cctv = cctvList[i];
      const position = new kakao.maps.LatLng(cctv.latitude, cctv.longitude);
      const marker = addCctvMarker(position, cctv.cctvCount);
      cctvMarkers.push(marker);
    }
  }

  function addCctvMarker(position, cctvCount) {
    const imageSrc = 'img/cctv.png';
    const imageSize = new kakao.maps.Size(27, 28);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const marker = new kakao.maps.Marker({
      position: position,
      image: markerImage
    });

    marker.setMap(map);

    // 마커에 클릭 이벤트 등록
    kakao.maps.event.addListener(marker, 'click', function () {
      alert('CCTV 개수: ' + cctvCount);
    });

    return marker;
  }

  function removeCctvMarkers() {
    for (let i = 0; i < cctvMarkers.length; i++) {
      cctvMarkers[i].setMap(null);
    }
    cctvMarkers = [];
  }

  // streetlight
  function getStreetlightData(map) {
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest();
    const neLatLng = bounds.getNorthEast();

    $.ajax({
      url: 'http://localhost:8080/api/light/map',
      type: 'GET',
      data: {
        swLat: swLatLng.getLat(),
        swLng: swLatLng.getLng(),
        neLat: neLatLng.getLat(),
        neLng: neLatLng.getLng()
      },
      success: function (response) {
        displayStreetlightMarkers(response);
      },
      error: function (error) {
        console.log(error);
      }
    });
  }

  function displayStreetlightMarkers(streetlightList) {
    // 기존의 가로등 마커 제거
    removeStreetlightMarkers();

    // 새로운 가로등 마커 추가
    for (let i = 0; i < streetlightList.length; i++) {
      const streetlight = streetlightList[i];
      const position = new kakao.maps.LatLng(streetlight.xcoordinate, streetlight.ycoordinate);
      const marker = addStreetlightMarker(position);
      streetlightMarkers.push(marker);
    }
  }

  function addStreetlightMarker(position) {
    const imageSrc = 'img/streetlight.png';
    const imageSize = new kakao.maps.Size(27, 28);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    const marker = new kakao.maps.Marker({
      position: position,
      image: markerImage
    });

    marker.setMap(map);

    return marker;
  }

  function removeStreetlightMarkers() {
    for (let i = 0; i < streetlightMarkers.length; i++) {
      streetlightMarkers[i].setMap(null);
    }
    streetlightMarkers = [];
  }

  onMounted(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoMapApiKey}&autoload=false&libraries=services`;
    document.head.appendChild(script);    

    script.onload = () => {
      kakao.maps.load(async () => {           
        init() 
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


</style>
