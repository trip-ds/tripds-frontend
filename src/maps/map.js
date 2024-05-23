import $ from "jquery";
import { toEok, toSecond, toPercent } from "@/util/map-commons";

const getInfo = () => {
  const center = map.getCenter();
  const level = map.getLevel();
  const bounds = map.getBounds(); // 현재 영역
  const swLatLng = bounds.getSouthWest(); // 영역의 남서쪽 좌표
  const neLatLng = bounds.getNorthEast(); // 영역의 북동쪽 좌표
  const boundsStr = bounds.toString(); // (문자열) 영역정보: ((남,서), (북,동))

  let message = "지도 중심좌표는 위도 " + center.getLat() + ", ";
  message += "경도 " + center.getLng() + " 이고 \n";
  message += "지도 레벨은 " + level + " 입니다 \n";
  message +=
    "지도의 남서쪽 좌표는 " +
    swLatLng.getLat() +
    ", " +
    swLatLng.getLng() +
    " 이고 \n";
  message +=
    "북동쪽 좌표는 " + neLatLng.getLat() + ", " + neLatLng.getLng() + " 입니다";

  // return boundsStr
  return message;
};

const displaySiGunGuInfoCB = (result, status) => {
  if (status !== kakao.maps.services.Status.OK) {
    console.error("request fail! si_gun_gu");
    return;
  }

  const { region_1depth_name, region_2depth_name, region_3depth_name } =
    result[1];
  const regionNames = [
    region_1depth_name,
    region_2depth_name,
    region_3depth_name,
  ];
  const breadcrumbItems = $("ol.breadcrumb")[0].children;

  for (let i = 0; i < breadcrumbItems.length; i++)
    breadcrumbItems[i].textContent = regionNames[i];
};

const addFacilityMarker = (position, category) => {
  const imageSrc = `img/${category}.png`;
  const imageSize = new kakao.maps.Size(27, 28);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  const marker = new kakao.maps.Marker({
    position: position,
    image: markerImage,
  });

  marker.setMap(map);
  facilityMarkers.push(marker);

  return marker;
};

// const removeFacilityMarker = (facilityMarkers) => {
//   for (let i = 0; i < facilityMarkers.length; i++) {
//     facilityMarkers[i].setMap(null);
//   }
//   facilityMarkers = [];
// };

const searchFacilitiesCB = (data, status) => {
  if (status === kakao.maps.services.Status.OK) displayFacilities(data);
  // else if (status === kakao.maps.services.Status.ZERO_RESULT) console.log("fail")
  // else if (status === kakao.maps.services.Status.ERROR) console.log("error")
};

const displayFacilities = (places) => {
  for (let i = 0; i < places.length; i++) {
    const category = places[i].category_name.split(">")[1].trim();
    const marker = addFacilityMarker(
      new kakao.maps.LatLng(places[i].y, places[i].x),
      category
    );
    (function (marker, place) {
      kakao.maps.event.addListener(marker, "click", function () {
        displayFacilityInfo(place);
      });
    })(marker, places[i]);
  }
};

// const addCategoryClickEvent = (
//   facilityOverlay,
//   curCategory,
//   searchFacilities
// ) => {
//   const category = document.getElementById("category");
//   const children = category.children;

//   for (let i = 0; i < children.length; i++)
//     children[i].onclick = function () {
//       onClickCategory.call(
//         this,
//         facilityOverlay,
//         curCategory,
//         changeCategoryClass,
//         removeFacilityMarker,
//         removeCctvMarkers,
//         removeStreetlightMarkers,
//         searchFacilities
//       );
//     };
// };

function onClickCategory(
  facilityOverlay,
  curCategory,
  changeCategoryClass,
  removeFacilityMarker,
  removeCctvMarkers,
  removeStreetlightMarkers,
  searchFacilities
) {
  const id = this.id,
    className = this.className;

  facilityOverlay.setMap(null);

  if (className === "on") {
    curCategory = "";
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
  const category = document.getElementById("category");
  let children = category.children;

  for (let i = 0; i < children.length; i++) children[i].className = "";

  if (el) el.className = "on";
}

const addComplexMarker = (map, position) => {
  const imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png"; // TODO: '단지' 이미지로 변경
  const imageSize = new kakao.maps.Size(64, 69);
  const imageOptions = {
    // spriteSize: new kakao.maps.Size(27,69),
    // spriteOrigin: new kakao.maps.Point(46,(order*36)),
    offset: new kakao.maps.Point(27, 69),
  };
  const markerImage = new kakao.maps.MarkerImage(
    imageSrc,
    imageSize,
    imageOptions
  );
  const marker = new kakao.maps.Marker({
    //   position: position,
    position: new kakao.maps.LatLng(37.5566314744617, 127.009975257685),
    image: markerImage,
  });

  marker.setMap(map);
  // complexMarkers.push(marker)

  // return marker
};

const displayComplexSummaryInfo = (map, info) => {
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
    `;

  let complexOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }); // 커스텀 오버레이 (장소정보)
  complexOverlay.setMap(map);
  complexOverlay.setPosition(
    new kakao.maps.LatLng(info.yCoordinate, info.xCoordinate)
  );
  complexOverlay.setContent(content);
};

const displayComplexInfo = (info) => {
  $("td#roadName").text(info.roadName);
  $("td#buildYear").text(info.buildYear);
  $("td#height").text(info.height);
  $("td#households").text(info.households);
  $("td#buildingArea").text(info.buildingArea);
  $("td#floorArea").text(info.floorArea);
  $("td#siteArea").text(info.siteArea);
  $("td#floorsMinMax").text(info.floorsMin + "/" + info.floorsMax);
  $("td#elevatorCnt").text(info.passengerElevatorCnt);
};

const displayComplexDealSummaryInfo = (info) => {
  let salePriceRange, rentalPriceRange, netAreaRange;

  if (info.minPrice === info.maxPrice) {
    salePriceRange = toEok(info.minPrice) + "억";
    rentalPriceRange = toEok(info.minDeposit) + "억";
    netAreaRange = toEok(info.minNetArea) + "m²";
  } else {
    salePriceRange =
      toEok(info.minPrice) + "억 ~" + toEok(info.maxPrice) + "억";
    rentalPriceRange =
      toEok(info.minDeposit) + "억 ~" + toEok(info.maxDeposit) + "억";
    netAreaRange = info.minNetArea + "m² ~ " + info.maxNetArea + "m²";
  }

  $("dl.complex_sale_price_range > dd.data").text(salePriceRange);
  $("dl.complex_rental_price_range > dd.data").text(rentalPriceRange);
  $("dl.complex_net_area_range > dd.data").text(netAreaRange);
};

const displayComplexDealInfo = (info) => {
  let complexDealPrice;
  if (info.contractType === "월세")
    complexDealPrice = `${info.monthlyRent} / ${info.deposit}`;
  else if (info.contractType === "전세")
    complexDealPrice = toEok(info.deposit) + "억";
  else if (info.contractType === "매매")
    complexDealPrice = toEok(info.price) + "억";

  let content = `
      <a class="list-group-item list-group-item-action complex_deal" id="list-home-list" data-bs-toggle="list" aria-controls="list-home">        
        <div class="d-flex w-100 mb-2 justify-content-between">
          <h4 class="m-1 complex_deal_building_name"><span class="badge bg-secondary me-2 complex_deal_contract_type">${info.contractType}</span>${info.name}</h4>
          <!-- <button class="btn btn-link"><img class="like" src="heart.svg" /></button> -->
        </div>
        <div class="price_line ms-2"><span class="complex_deal_price fs-4">${complexDealPrice}</span></div>
        <div class="mt-2 ms-2"><span class="complex_deal_floor">${info.floor}층</span>, <span class="complex_deal_net_area">${info.netArea}m²</span></div>
        <div class="mt-2"><small class="complex_deal_contract_date fw-bold">거래: ${info.contractDate}</small></div>
      </a>
    `;

  $(".complex_deal_list .list-group").append(content);
};

const displayReviewSummaryInfo = (info) => {
  console.log(info);

  let content = `
    <h5 class="card-title text-center"><i class="fa-solid fa-star" style="color: #ffd43b;"></i>${toSecond(
      info.avgRating
    )}</h5>
    <div class="card-text gap-2">
    <div class="d-flex justify-content-center align-items-center">
        <span class="me-2">교통</span>
        <div class="progress" style="width: 380px;">
        <div class="progress-bar" role="progressbar" style="width: ${toPercent(
          info.avgTransportRating,
          5
        )}%;" aria-valuenow="${toSecond(
    info.avgTransportRating
  )}" aria-valuemin="0" aria-valuemax="5">${toSecond(
    info.avgTransportRating
  )}</div>              
        </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
        <span class="me-2">단지</span>
        <div class="progress" style="width: 380px;">
        <div class="progress-bar bg-success" role="progressbar" style="width: ${toPercent(
          info.avgComplexRating,
          5
        )}%;" aria-valuenow="${toSecond(
    info.avgComplexRating
  )}" aria-valuemin="0" aria-valuemax="5">${toSecond(
    info.avgComplexRating
  )}</div>              
        </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
        <span class="me-2">주변</span>
        <div class="progress" style="width: 380px;">
        <div class="progress-bar bg-info" role="progressbar" style="width: ${toPercent(
          info.avgFacilityRating,
          5
        )}%;" aria-valuenow="${toSecond(
    info.avgFacilityRating
  )}" aria-valuemin="0" aria-valuemax="5">${toSecond(
    info.avgFacilityRating
  )}</div>
        </div>
    </div>
    </div>
`;

  $(".complex_review_count").text(info.cnt);
  $(".complex_review_summary").html(content);
};

const displayReviewInfo = (info) => {
  let content = `
    <a class="list-group-item list-group-item-action" id="list-home-list" aria-controls="list-home">
    <div class="d-flex w-100 mb-2 justify-content-between">
        <h5 class="m-1"><span class="badge bg-info me-2">${
          info.ageCategory
        }</span>${info.authorEmailId}</h5>
        <small>거주: ${info.residencePeriod}</small>
    </div>
    <div class="card-text gap-2">
        <div class="d-flex justify-content-center align-items-center">
        <span class="me-2">교통</span>
        <div class="progress" style="width: 380px;">
            <div class="progress-bar" role="progressbar" style="width: ${toPercent(
              info.transportRating,
              5
            )}%;" aria-valuenow="${
    info.transportRating
  }" aria-valuemin="0" aria-valuemax="5">${
    info.transportRating
  }</div>                
        </div>
        </div>
        <div class="d-flex justify-content-center align-items-center">
        <span class="me-2">단지</span>
        <div class="progress" style="width: 380px;">
            <div class="progress-bar bg-success" role="progressbar" style="width: ${toPercent(
              info.complexRating,
              5
            )}%;" aria-valuenow="${
    info.complexRating
  }" aria-valuemin="0" aria-valuemax="5">${
    info.complexRating
  }</div>                
        </div>
        </div>
        <div class="d-flex justify-content-center align-items-center">
        <span class="me-2">주변</span>
        <div class="progress" style="width: 380px;">
            <div class="progress-bar bg-info" role="progressbar" style="width: ${toPercent(
              info.facilityRating,
              5
            )}%;" aria-valuenow="${
    info.facilityRating
  }" aria-valuemin="0" aria-valuemax="5">${
    info.facilityRating
  }</div>                
        </div>
        </div>
    </div>
    <hr />
    <div class="mt-2 ms-2">${info.content}</div>
    <div class="d-flex justify-content-end">
        <small class="pt-4">작성일: ${info.createDate}</small>
    </div>
    </a>
`;

  $(".complex_review_list .list-group").append(content);
};

const addRoadNameToReviewButtons = (roadName) => {
  $(".complex_review_more_button").attr("data-road_name", roadName);
  $(".complex_review_write_button").attr("data-road_name", roadName);
};

const clearComplexDealList = () => {
  $(".complex_deal_list .list-group").empty();
};

const clearReviewList = () => {
  $(".complex_review_list .list-group").empty();
};

const getBounds = (map) => {
  const bounds = map.getBounds();
  const swLatLng = bounds.getSouthWest();
  const neLatLng = bounds.getNorthEast();

  const topLat = neLatLng.getLat();
  const bottomLat = swLatLng.getLat();
  const leftLng = swLatLng.getLng();
  const rightLng = neLatLng.getLng();

  return { topLat, bottomLat, leftLng, rightLng };
};

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
  const imageSrc = "img/cctv.png";
  const imageSize = new kakao.maps.Size(27, 28);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  const marker = new kakao.maps.Marker({
    position: position,
    image: markerImage,
  });

  marker.setMap(map);

  // 마커에 클릭 이벤트 등록
  kakao.maps.event.addListener(marker, "click", function () {
    alert("CCTV 개수: " + cctvCount);
  });

  return marker;
}

// function removeCctvMarkers() {
//   for (let i = 0; i < cctvMarkers.length; i++) {
//     cctvMarkers[i].setMap(null);
//   }
//   cctvMarkers = [];
// }

function displayStreetlightMarkers(streetlightList) {
  // 기존의 가로등 마커 제거
  removeStreetlightMarkers();

  // 새로운 가로등 마커 추가
  for (let i = 0; i < streetlightList.length; i++) {
    const streetlight = streetlightList[i];
    const position = new kakao.maps.LatLng(
      streetlight.xcoordinate,
      streetlight.ycoordinate
    );
    const marker = addStreetlightMarker(position);
    streetlightMarkers.push(marker);
  }
}

function addStreetlightMarker(position) {
  const imageSrc = "img/streetlight.png";
  const imageSize = new kakao.maps.Size(27, 28);
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
  const marker = new kakao.maps.Marker({
    position: position,
    image: markerImage,
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

export {
  getInfo,
  displaySiGunGuInfoCB,
  addFacilityMarker,
  //   removeFacilityMarker,
  searchFacilitiesCB,
  displayFacilities,
  //   addCategoryClickEvent,
  onClickCategory,
  changeCategoryClass,
  addComplexMarker,
  displayComplexSummaryInfo,
  displayComplexInfo,
  displayComplexDealSummaryInfo,
  displayComplexDealInfo,
  displayReviewSummaryInfo,
  displayReviewInfo,
  addRoadNameToReviewButtons,
  clearComplexDealList,
  clearReviewList,
  getBounds,
  displayCctvMarkers,
  addCctvMarker,
  //   removeCctvMarkers,
  displayStreetlightMarkers,
  addStreetlightMarker,
  removeStreetlightMarkers,
};
