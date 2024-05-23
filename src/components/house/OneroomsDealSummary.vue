<script setup>
import MainHeader from "@/components/layout/HeadingNavbar.vue";
import OneroomHeader from "@/components/house/OneroomHeader.vue";
import MapGeoHeader from "@/components/map/MapGeoHeader.vue";
import MapComplex from "@/components/map/MapComplex.vue";
import MapComplexOffCanvas from "@/components/map/MapComplexOffCanvas.vue";
</script>

<template>
  <div id="app">
    <MainHeader/>
    <OneroomHeader/>
    
    <MapGeoHeader/>
    <MapComplex/>   
    <MapComplexOffCanvas residenceType="oneroom"/>  
  </div>
</template>

<style scoped>
  #app {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
</style>
