import { addEventHandle } from "@/util/js-commons";
import {
  // getInfo,
  displaySiGunGuInfoCB,
  // addFacilityMarker,
  // removeFacilityMarker,
  // searchFacilitiesCB,
  // displayFacilities,
  // addCategoryClickEvent,
  // onClickCategory,
  // changeCategoryClass,
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
  // addCctvMarker,
  // removeCctvMarkers,
  displayStreetlightMarkers,
  // addStreetlightMarker,
  // removeStreetlightMarkers,
} from "@/maps/map";

const displaySiGunGuInfo = (map, geocoder) => {
  const center = map.getCenter();
  const centerLng = center.getLng();
  const centerLat = center.getLat();

  // request: 좌표 to 행정동 주소
  geocoder.coord2RegionCode(centerLng, centerLat, displaySiGunGuInfoCB);
};

const displayFacilityInfo = (place) => {
  // let content = `<div class="facilityinfo"><a class="title" href="${place.place_url}" target="_blank" title="${place.place_name}" >${place.place_name}</a>`
  let content = `<div class="facilityinfo">`;

  if (place.road_address_name) {
    content += ` <span title=${place.road_address_name}>${place.road_address_name}</span> <span class="jibun" title=${place.address_name}>(지번 : ${place.address_name})</span>`;
  } else {
    content += ` <span title=${place.address_name}>${place.address_name}</span>`;
  }

  content += ` <span class="tel">${place.phone}</span></div><div class="after"></div>`;
  facilityContentNode.innerHTML = content;
  facilityOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
  facilityOverlay.setMap(map);
};

// const searchFacilities = (map, ps, curCategory, facilityOverlay) => {
//   if (!curCategory) {
//     return;
//   } else if (curCategory === "CCTV") {
//     getCctvData(map);
//   } else if (curCategory === "streetlight") {
//     getStreetlightData(map);
//   } else {
//     facilityOverlay.setMap(null);

//     removeFacilityMarker();

//     ps.categorySearch(curCategory, searchFacilitiesCB, { useMapBounds: true });
//   }
// };

// function initFacility(map, ps, curCategory) {
//   let facilityContentNode = document.createElement("div"); // 커스텀 오버레이 노드
//   facilityContentNode.className = "facilityinfo_wrap";

//   let facilityOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }); // 커스텀 오버레이 (장소정보)
//   facilityOverlay.setContent(facilityContentNode);

//   addEventHandle(facilityContentNode, "mousedown", kakao.maps.event.preventMap);
//   addCategoryClickEvent(facilityOverlay, curCategory, searchFacilities);

//   kakao.maps.event.addListener(
//     map,
//     "idle",
//     () => searchFacilities(map, ps, curCategory, facilityOverlay)
//   );
// }

const getComplexDealSummaryList = (map, residenceType) => {
  const { topLat, bottomLat, leftLng, rightLng } = getBounds(map);
  $.ajax({
    url: "http://localhost:8080/api/house/deal/list-summary",
    type: "GET",
    data: {
      residenceType,
      topLat,
      bottomLat,
      leftLng,
      rightLng,
    },
    success: function (response) {
      for (const dealSummary of response) {
        // console.log(dealSummary)

        if (dealSummary.contractType === "전세") {
          dealSummary.avgAmount = dealSummary.avgDeposit / 10000;
          dealSummary.amountUnit = "억";
        } else if (dealSummary.contractType === "월세") {
          dealSummary.avgAmount = `${dealSummary.avgMonthlyRent}/${dealSummary.avgDeposit}`;
          dealSummary.amountUnit = "";
        } else if (dealSummary.contractType === "매매") {
          dealSummary.avgAmount = dealSummary.avgPrice / 10000;
          dealSummary.amountUnit = "억";
        }

        addComplexMarker(map, dealSummary);
        displayComplexSummaryInfo(map, dealSummary);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
};

const getComplexSummary = (roadName) => {
  $.ajax({
    url: "http://localhost:8080/api/house/summary",
    type: "GET",
    data: {
      roadName,
    },
    success: function (response) {
      displayComplexInfo(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
};

const getComplexDealSummary = (residenceType, roadName) => {
  $.ajax({
    url: "http://localhost:8080/api/house/deal/summary",
    type: "GET",
    data: {
      residenceType,
      roadName,
    },
    success: function (response) {
      displayComplexDealSummaryInfo(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
};

const getComplexDealList = (residenceType, roadName) => {
  $.ajax({
    url: "http://localhost:8080/api/house/deal/list",
    type: "GET",
    data: {
      residenceType,
      roadName,
    },
    success: function (response) {
      clearComplexDealList();
      for (let info of response) {
        displayComplexDealInfo(info);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
};

const getComplexReviewSummary = (roadName) => {
  $.ajax({
    url: "http://localhost:8080/api/house/review/summary",
    type: "GET",
    data: {
      roadName,
    },
    success: function (response) {
      displayReviewSummaryInfo(response);
      addRoadNameToReviewButtons(roadName);
    },
    error: function (error) {
      console.log(error);
    },
  });
};

const getComplexReviewList = (roadName) => {
  $.ajax({
    url: "http://localhost:8080/api/house/review/list",
    type: "GET",
    data: {
      roadName,
    },
    success: function (response) {
      clearReviewList();
      for (let info of response) {
        displayReviewInfo(info);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
};

const insertReview = (review) => {
  $.ajax({
    url: "http://localhost:8080/api/house/review",
    type: "POST",
    data: review,
    contentType: "application/x-www-form-urlencoded", // URL 인코딩된 데이터 형식
    success: function (response) {
      $("#residence_period").val("거주기간");
      $("#transportRating").val(3);
      $("#complexRating").val(3);
      $("#facilityRating").val(3);
      $("#content").val("");

      $("#successModal").modal("show");
      $(".modal-backdrop").removeClass("modal-backdrop");
    },
    error: function (error) {
      console.log(error);
    },
  });
};

// cctv
function getCctvData(map) {
  const bounds = map.getBounds();
  const swLatLng = bounds.getSouthWest();
  const neLatLng = bounds.getNorthEast();

  $.ajax({
    url: "http://localhost:8080/api/cctv/map",
    type: "GET",
    data: {
      swLat: swLatLng.getLat(),
      swLng: swLatLng.getLng(),
      neLat: neLatLng.getLat(),
      neLng: neLatLng.getLng(),
    },
    success: function (response) {
      displayCctvMarkers(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// streetlight
function getStreetlightData(map) {
  const bounds = map.getBounds();
  const swLatLng = bounds.getSouthWest();
  const neLatLng = bounds.getNorthEast();

  $.ajax({
    url: "http://localhost:8080/api/light/map",
    type: "GET",
    data: {
      swLat: swLatLng.getLat(),
      swLng: swLatLng.getLng(),
      neLat: neLatLng.getLat(),
      neLng: neLatLng.getLng(),
    },
    success: function (response) {
      displayStreetlightMarkers(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

export {
  displaySiGunGuInfo,
  displayFacilityInfo,
  // searchFacilities,
  // initFacility,
  getComplexDealSummaryList,
  getComplexSummary,
  getComplexDealSummary,
  getComplexDealList,
  getComplexReviewSummary,
  getComplexReviewList,
  insertReview,
  getCctvData,
  getStreetlightData,
};
