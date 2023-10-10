<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
  <hr />

  <div class="parent">
    <span>Trees</span>
    <div class="div0">0</div>
    <div class="div1">
      <img
        src="marker-icon-grey.png"
        width="15px"
      />
    </div>
    <div class="div2">0</div>
    <div class="div3">
      <img
        src="marker-icon-green.png"
        width="15px"
      />
    </div>
    <div class="div4">1 - 10</div>
    <div class="div5">
      <img
        src="marker-icon-gold.png"
        width="15px"
      />
    </div>
    <div class="div6">10 +</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const props = defineProps<{
  center: [number, number];
  markersData: { location: L.LatLngExpression; value: number }[];
}>();

const setupLeafletMap = () => {
  const map = L.map('mapContainer').setView(props.center, 13);
  map.setZoom(5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

  // Loop through the array and create markers
  for (const markerInfo of props.markersData) {
    const goldIcon = L.icon({
      iconUrl: 'marker-icon-2x-gold.png',
      shadowUrl: 'marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    const greenIcon = L.icon({
      iconUrl: 'marker-icon-2x-green.png',
      shadowUrl: 'marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    const greyIcon = L.icon({
      iconUrl: 'marker-icon-2x-grey.png',
      shadowUrl: 'marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const { location, value } = markerInfo;
    const icon =
      value === 0 ? greyIcon : value > 0 && value <= 10 ? greenIcon : goldIcon;

    const marker = L.marker(location)
      .addTo(map)
      .setIcon(icon)
      .bindPopup(`${value}`)
      .openPopup();
  }
};

onMounted(() => {
  setupLeafletMap();
});
</script>

<style scoped>
#mapContainer {
  width: 60vw;
  height: 75vh;
}

.parent {
  display: grid;
  grid-template-columns: repeat(7, fit-content(50px));
  grid-template-rows: 1fr;
  grid-column-gap: 9px;
  grid-row-gap: 0px;
  width: 300px;
}

.div0 {
  grid-area: 1 / 1 / 2 / 2;
}
.div1 {
  grid-area: 1 / 1 / 2 / 2;
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
}
.div3 {
  grid-area: 1 / 3 / 2 / 4;
}
.div4 {
  grid-area: 1 / 4 / 2 / 5;
}
.div5 {
  grid-area: 1 / 5 / 2 / 6;
}
.div6 {
  grid-area: 1 / 6 / 2 / 7;
}
</style>
