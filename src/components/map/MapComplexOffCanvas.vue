<script setup>
import { defineProps, onMounted } from "vue";
import {getComplexSummary, getComplexDealSummary, getComplexDealList, getComplexReviewSummary, getComplexReviewList, insertReview} from "@/api/map";  

// 부모로부터 전달받은 props 정의
const props = defineProps(['residenceType']);

onMounted(() => {  
  const residenceType = props.residenceType;

  let i = 0;
  $('img.like').on('click', function () {
  if (i == 0) {
    $(this).attr('src', 'heart-fill.svg');
    i++;
  } else if (i == 1) {
    $(this).attr('src', 'heart.svg');
    i--;
  }
  });
  
  $('.deal_list_order a').on('click', function (event) {
    event.preventDefault();
    $(this).toggleClass('active'); // 클릭된 링크의 active 클래스 토글      
    $('.deal_list_order a').not(this).removeClass('active'); // 다른 링크에서 active 클래스 제거
  });  
  
  $('body').on('click', 'button.complex_info', function(){
    if ($('.offcanvas')[0].classList.contains('show')) return false;
  
    const roadName = $(this).data('road_name')
    console.log(roadName, residenceType)
  
    getComplexSummary(roadName)
    getComplexDealSummary(residenceType, roadName)
    getComplexDealList(residenceType, roadName)
    getComplexReviewSummary(roadName)
  })
  
  $('body').on('click', 'button.complex_review_more_button', function(){
    if ($('.offcanvas')[0].classList.contains('collapsed')) return false;
  
    const roadName = $(this).data('road_name')
    console.log(roadName)
  
    getComplexReviewList(roadName)
  })
  
  $('.deal_list_order a').on('click', function(event) {
      event.preventDefault();      
      $(this).toggleClass('active'); // 클릭된 링크의 active 클래스 토글      
      $('.deal_list_order a').not(this).removeClass('active'); // 다른 링크에서 active 클래스 제거
  });  

  $('input[name="residence_period"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: 'Clear'
    }
  });

  $('body').on('apply.daterangepicker', 'input[name="residence_period"]',function(ev, picker) {
    $(this).val(picker.startDate.format('YYYY.MM.DD') + ' - ' + picker.endDate.format('YYYY.MM.DD'));
  });

  $('body').on('cancel.daterangepicker', 'input[name="residence_period"]', function(ev, picker) {
    $(this).val('');
  });

  $('body').on('submit', 'form.complex_review_form', function(event) {
    event.preventDefault();

    const authorEmail = 'ssafy@ssafy.com'; // TODO: header쪽에서 받아오기
    const period = $('input[name="residence_period"]').val().split(' - ');
    const roadName = $('.complex_review_write_button').data('road_name')
    const residencePeriodStart = period[0].slice(0, -3);
    const residencePeriodEnd = period[1].slice(0, -3);

    let formData = $(this).serializeArray();
    formData.push({ name: 'authorEmail', value: authorEmail });
    formData.push({ name: 'residencePeriodStart', value: residencePeriodStart });
    formData.push({ name: 'residencePeriodEnd', value: residencePeriodEnd });
    formData.push({ name: 'roadName', value: roadName });

    // 직렬화된 데이터를 URL 인코딩된 문자열로 변환
    let serializedData = $.param(formData);

    insertReview(serializedData)
  })
})
</script>

<template>
  <aside>
    <div class="offcanvas offcanvas-start " data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling"
      aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header ms-4 mt-3">
        <h5 class="offcanvas-title" id="offcanvasNavbarLabel">{{ residenceType }}</h5>
        <button type="button" class="btn-close text-reset me-3" data-bs-dismiss="offcanvas"aria-label="Close"></button>            
      </div>
      <div class="offcanvas-body container-fluid">
        <div class="col mb-3">
          <div class="card">
            <div class="card-header text-success fs-4 fw-bold">단지 정보</div>
            <div class="card-body complex_summary">
              <table class="table table-auto">
                <tbody>
                  <tr>
                    <td class="info-item bg-secondary bg-opacity-10 text-center">주소</td>
                    <td class="info-value" id="roadName" colspan="5">....</td>
                  </tr>
                  <tr>
                    <td class="info-item bg-secondary bg-opacity-10 text-center">건축년도</td>
                    <td class="info-value" id="buildYear" colspan="2">....</td>
                    <td class="info-item bg-secondary bg-opacity-10 text-center">높이</td>
                    <td class="info-value" id="height" colspan="2">...</td>
                  </tr>
                  <tr>
                    <td class="info-item bg-secondary bg-opacity-10 text-center">세대수</td>
                    <td class="info-value" id="households" colspan="2">...</td>
                    <td class="info-item bg-secondary bg-opacity-10 text-center">건축면적</td>
                    <td class="info-value" id="buildingArea" colspan="2">....</td>
                  </tr>
                  <tr>
                    <td class="info-item bg-secondary bg-opacity-10 text-center">연면적</td>
                    <td class="info-value" id="floorArea" colspan="2">....</td>
                    <td class="info-item bg-secondary bg-opacity-10 text-center">대지면적</td>
                    <td class="info-value" id="siteArea" colspan="2">....</td>
                  </tr>
                  <tr>
                    <td class="info-item bg-secondary bg-opacity-10 text-center">최저/최고층</td>
                    <td class="info-value" id="floorsMinMax" colspan="2">....</td>
                    <td class="info-item bg-secondary bg-opacity-10 text-center">승강기수</td>
                    <td class="info-value" id="elevatorCnt" colspan="2">....</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="col mb-3">
          <div class="card">
            <div class="card-header text-success fs-4 fw-bold">거래 정보</div>
            <div class="card-body complex_deal_summary">
              <dl class="complex_sale_price_range">
                <dd class="title">매매가</dd>
                <dd class="data fw-bold">3억 4,000~4억 5,000</dd>
              </dl>
              <dl class="complex_rental_price_range">
                <dd class="title">전세가</dd>
                <dd class="data fw-bold">2억 4,000~3억 5,000</dd>
              </dl>
              <dl class="complex_net_area_range">
                <dd class="title">전용면적</dd>
                <dd class="data fw-bold">30m²~48m²</dd>
              </dl>
            </div>
          </div>
        </div>
        <div class="col mb-3">
          <div class="card">
            <div class="card-header text-success fs-4 fw-bold">거래 내역</div>
            <div class="card-body col-12 complex_deal_list">
              <div class="deal_list_order d-flex ms-1">
                <a href="#" role="button" class="link-dark active">최신순</a>
                <a href="#" role="button" class="link-dark">면적순</a>
              </div>
              <div class="list-group gap-3"></div>
            </div>
          </div>
        </div>
        <div class="col mb-3">
          <div class="card">
            <div class="card-header text-success fs-4 fw-bold">리뷰</div>
            <div class="card-body col-12">
              <div class="card text-dark bg-light mb-3">
                <div class="card-header">평균 평점</div>
                <div class="card-body complex_review_summary"></div>
              </div>
              <div class="d-flex justify-content-center align-items-center gap-2">
                <button class="btn btn-primary complex_review_more_button" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseReviewList" aria-expanded="false" aria-controls="collapseReviewList">리뷰
                  더보기<span class="badge bg-secondary ms-1 complex_review_count"></span>
                </button>
                <button class="btn btn-primary complex_review_write_button" type="button" data-bs-toggle="collapse"
                  data-bs-target="#collapseReviewWrite" aria-expanded="false" aria-controls="collapseReviewWrite">리뷰
                  쓰기</button>
              </div>

              <div class="collapse mt-3 complex_review_list" id="collapseReviewList">
                <div class="list-group gap-3">
                </div>
              </div>
              <div class="collapse mt-3" id="collapseReviewWrite">
                <form class="row g-3 complex_review_form">
                  <div class="input-group">
                    <input type="text" class="mx-auto" name="residence_period" id="residence_period" placeholder="거주기간" value="" style="width: 100%; text-align: center; border-radius: 100;"/>
                  </div>

                  <div class="input-group">
                    <label for="trafficReview" class="form-label">교통</label>
                    <input type="range" class="form-range" name="transportRating" min="0" max="5" id="transportRating">
                  </div>
                  <div class="input-group">
                    <label for="complexReview" class="form-label">단지</label>
                    <input type="range" class="form-range" name="complexRating" min="0" max="5" id="complexRating">
                  </div>
                  <div class="input-group">
                    <label for="facilityReview" class="form-label">주변</label>
                    <input type="range" class="form-range" name="facilityRating" min="0" max="5" id="facilityRating">
                  </div>

                  <div class="input-group">
                    <span class="input-group-text">review</span>
                    <textarea class="form-control" name="content" aria-label="With textarea" id="content"></textarea>
                  </div>

                  <div class="col-12 d-flex justify-content-center align-items-center">
                    <button type="submit" class="btn btn-primary complex_review_submit">Submit</button>
                  </div>
                </form>
              </div>

              <!-- Success Modal -->
              <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="successModalLabel">Success</h5>
                    </div>
                    <div class="modal-body">
                      리뷰 등록 완료
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>

</style>
