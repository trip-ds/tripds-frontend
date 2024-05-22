import $ from "jquery";

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

const displaySiGunGuInfoCB = (result, status) => {
  if (status !== kakao.maps.services.Status.OK) {
    console.error("request fail! si_gun_gu");
    return;
  }

  const { region_1depth_name, region_2depth_name, region_3depth_name } = result[1];    
  const regionNames = [
    region_1depth_name,
    region_2depth_name,
    region_3depth_name,
  ];
  const breadcrumbItems = $("ol.breadcrumb")[0].children;

  for (let i = 0; i < breadcrumbItems.length; i++)
    breadcrumbItems[i].textContent = regionNames[i];
};

const displaySiGunGuInfo = (map, geocoder) => {
  const center = map.getCenter();
  const centerLng = center.getLng();
  const centerLat = center.getLat();

  // request: 좌표 to 행정동 주소
  geocoder.coord2RegionCode(centerLng, centerLat, displaySiGunGuInfoCB);
};

export { getBounds, displaySiGunGuInfo };
