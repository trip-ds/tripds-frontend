import $ from "jquery";
import { getBounds } from "@/maps/map";

let complexOverlay;

const displayComplexSummaryInfoCB = (map, info) => {
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
  
    complexOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }); // 커스텀 오버레이 (장소정보)
    complexOverlay.setMap(map);
    complexOverlay.setPosition(
      new kakao.maps.LatLng(info.yCoordinate, info.xCoordinate)
    );
    complexOverlay.setContent(content);
  };

const addComplexMarkerCB = (map, position) => {
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
    //   position: new kakao.maps.LatLng(37.566826, 126.9786567),
    position: new kakao.maps.LatLng(position.yCoordinate, position.xCoordinate),
    image: markerImage,
  });

  marker.setMap(map);
  // complexMarkers.push(marker)

  // return marker
};

const getComplexDealSummaryList = (map, residenceType) => {
  $.ajax({
    url: "http://localhost:8080/api/house/deal/list-summary",
    type: "GET",
    data: {
      residenceType,
      ...getBounds(map),
    },
    success: function (response) {
      for (const dealSummary of response) {
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

        addComplexMarkerCB(map, dealSummary);
        displayComplexSummaryInfoCB(map, dealSummary);
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
};

export { getComplexDealSummaryList };
